import { AngularFireDatabase } from 'angularfire2/database';
import { Http, Headers,  } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ComplaintsService {

  People: any[];
  events = [];
  sender;
  receiver;
  message;
  JSONdata;
  count;
  users;
  status;
  tweet_id;
  tweeter;
  dm_data;
  dataDB;
  senderName;
  senderUsername;
  tweet_data;

  constructor(private http: Http, private db: AngularFireDatabase) { }

  // checkMessageFormat(message: string) {
  //   let subStr;
  //   let location;
  //   let subStr2;
  //   let type;
  //   let subStr3;
  //   let body;
  //   let count = 0;
  //   if (message.toString().toLowerCase().includes('location:')) {
  //     subStr = message.toString().toLowerCase().split('type:');
  //     location = subStr[0].split('location:')[1];
  //     count++;
  //   }
  //   if (message.toString().toLowerCase().includes('type:')) {
  //     subStr2 = subStr.toString().toLowerCase().split('body:');
  //     type = subStr2[0];
  //     count++;
  //   }
  //   if (message.toString().toLowerCase().includes('body:')) {
  //     subStr3 = message.toString().toLowerCase().split('body:');
  //     body = subStr3[1];
  //     count++;
  //   }
  //   if (count == 3) {
  //     return [location, type, body];
  //   }  else {
  //     return false;
  //   }
  // }

  checkMessageFormat(str: string) {
    var s;
    s = str.toLowerCase();
    var pos1=s.indexOf("location:");
    var pos2=s.indexOf("type:");
    var pos3=s.indexOf("body:");
    if(pos1==-1 || pos2==-1 || pos3==-1)
    {
        return -1;
    }
    else
    {
        var map = new Map();
        var pos4=s.length;
        var ind=[pos1,pos2,pos3,pos4]
        ind.sort();
        if(ind[0]!=0)
        {
            return -1;
        }
        else
        {
            if(s[ind[0]]=="l")
            {
                var s1="";
                for(var i=ind[0]+9;i<ind[1];i++)
                {
                    s1+=str[i];
                }
                map.set("location",s1);
            }
            else if(s[ind[0]]=="b")
            {
                var s1="";
                for(var i=ind[0]+5;i<ind[1];i++)
                {
                    s1+=str[i];
                }
                 map.set("body",s1);
              
            }
            else
            {
                var s1="";
                for(var i=ind[0]+5;i<ind[1];i++)
                {
                    s1+=str[i];
                }
                map.set("type",s1);
                   
            }
            if(s[ind[1]]=="l")
            {
                var s1="";
                for(var i=ind[1]+9;i<ind[2];i++)
                {
                    s1+=str[i];
                }
                map.set("location",s1);
               
            }
            else if(s[ind[1]]=="b")
            {
                var s1="";
                for(var i=ind[1]+5;i<ind[2];i++)
                {
                    s1+=str[i];
                }
                map.set("body",s1);
            }
            else
            {
                var s1="";
                for(var i=ind[1]+5;i<ind[2];i++)
                {
                    s1+=str[i];
                }
                map.set("type",s1);
            }
            if(s[ind[2]]=="l")
            {
                var s1="";
                for(var i=ind[2]+9;i<ind[3];i++)
                {
                    s1+=str[i];
                }
                map.set("location",s1);
            }
            else if(s[ind[2]]=="b")
            {
                var s1="";
                for(var i=ind[2]+5;i<ind[3];i++)
                {
                    s1+=str[i];
                }
                map.set("body",s1);
            }
            else
            {
                var s1="";
                for(var i=ind[2]+5;i<ind[3];i++)
                {
                    s1+=str[i];
                }
                map.set("type",s1);
            }
            var fin=[map.get("location"),map.get("body"),map.get("type")];
            return fin;
        }
       
    }
  }

  manageComplaints(JSONdata) {
    if(JSONdata.event.hasOwnProperty('direct_message_events')){
      console.log(JSONdata);
      this.message = JSONdata.event.direct_message_events[0].message_create.message_data.text;
      console.log("Message: " + this.message);
      this.sender = JSONdata.event.direct_message_events[0].message_create.sender_id;
      this.receiver = JSONdata.event.direct_message_events[0].message_create.target.recipient_id;
      console.log("Sender: " + this.sender);
      console.log("Receiver: " + this.receiver);
      this.users = JSONdata.event.users;
      let sender = this.sender;
      console.log(this.users);
      for (var key in this.users) {
          if (key == sender) {
              this.senderName = this.users[key].name;
              this.senderUsername = this.users[key].screen_name;
          }
      }
      if (this.receiver == "1092065744211169286") {
        if (this.checkMessageFormat(this.message) != -1) {
          this.dm_data = this.checkMessageFormat(this.message);
          this.dataDB = {
            "Location": this.dm_data[0],
            "Type": this.dm_data[2],
            "Body": this.dm_data[1],
            "Timestamp": new Date().getTime(),
            "IssuerID": this.sender,
            "IssuerName": this.senderName,
            "IssuerUsername": this.senderUsername,
            "Platform": 'Twitter',
            "approved": 'false',
            "logoURL": 'https://www.sketchappsources.com/resources/source-image/twitterlogo_1x.png',
            "platform": "Twitter",
            "cssClass": "is-info",
            "mode": "direct_message"               
          };
          this.db.list('/twittercomplaints')
            .push(this.dataDB)
              .then(data => {
                const headers = new Headers();
                headers.append('Content-Type', 'application/json');
                this.http.post('https://pacific-wildwood-35781.herokuapp.com/direct_messages', { id: this.sender, message: "Your complaint has been recorded. Once it gets approved by the manager, we'll get back to you." }, {headers:headers})
                  .subscribe(data => {
                    console.log(data);
                  });
              })
              .catch(err => {
                console.log("Something Went Wrong");
              });
          
        } else {
          const headers = new Headers();
          headers.append('Content-Type', 'application/json');
          this.http.post('https://pacific-wildwood-35781.herokuapp.com/direct_messages', { id: this.sender, message: "Message not formatted properly. Please refer to the instructions at https://domain.com/instructions" }, {headers:headers})
            .subscribe(data => {
              console.log(data);
          });
        }
      }
    } else if (JSONdata.event.hasOwnProperty('tweet_create_events')) {
        console.log(JSONdata);
        this.message = JSONdata.event.tweet_create_events[0].text;
        this.message = this.message.replace('@ComplaintRecei1 ', '');
        console.log(this.message);
        if (this.checkMessageFormat(this.message) != -1) {
            if(JSONdata.event.tweet_create_events[0].user.id != "1092065744211169286") {
                this.tweet_id = JSONdata.event.tweet_create_events[0].id_str;
                this.sender = JSONdata.event.tweet_create_events[0].user.id_str;
                this.senderName = JSONdata.event.tweet_create_events[0].user.name;
                this.senderUsername = JSONdata.event.tweet_create_events[0].user.screen_name;
                this.tweet_data = this.checkMessageFormat(this.message);
                this.tweeter = JSONdata.event.tweet_create_events[0].user.screen_name;
                this.dataDB = {
                    "Location": this.tweet_data[0],
                    "Type": this.tweet_data[2],
                    "Body": this.tweet_data[1],
                    "Timestamp": new Date().getTime(),
                    "IssuerID": this.sender,
                    "IssuerName": this.senderName,
                    "IssuerUsername": this.senderUsername,
                    "Platform": 'Twitter',
                    "approved": 'false',
                    "logoURL": 'https://www.sketchappsources.com/resources/source-image/twitterlogo_1x.png',
                    "platform": "Twitter",
                    "cssClass": "is-info",
                    "mode": "tweet",
                    "tweet_id": this.tweet_id           
                };
                this.db.list('/twittercomplaints')
                    .push(this.dataDB)
                    .then(data => {
                        const headers = new Headers();
                        headers.append('Content-Type', 'application/json');
                        let msg = " Your complaint has been recorded. Once it gets approved by the manager, we'll get back to you."
                        this.http.post('https://pacific-wildwood-35781.herokuapp.com/reply_tweet', { id: this.tweet_id, name: this.tweeter, msg: msg }, {headers:headers})
                        .subscribe(data => {
                            console.log(data);
                        });
                    })
                    .catch(err => {
                        console.log("Something Went Wrong");
                    });
            }
        } else {
            if(JSONdata.event.tweet_create_events[0].user.id != "1092065744211169286") {
                this.tweet_id = JSONdata.event.tweet_create_events[0].id_str;
                this.tweeter = JSONdata.event.tweet_create_events[0].user.screen_name;
                const headers = new Headers();
                headers.append('Content-Type', 'application/json');
                let msg = " Message not formatted properly. Please refer to the instructions at https://domain.com/instructions"
                this.http.post('https://pacific-wildwood-35781.herokuapp.com/reply_tweet', { id: this.tweet_id, name: this.tweeter, msg: msg }, {headers:headers})
                .subscribe(data => {
                    console.log(data);
                });
            }
        }
        
    }
}

  notifyUserWithTrackingLinkDM(userID: string, ID: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const message = "Your complaint has been approved by the complaints manager. Here's the link to track it: " + "https://domain.com/" + ID;
    return this.http.post('https://pacific-wildwood-35781.herokuapp.com/direct_messages', { id: userID, message: message }, {headers:headers});
  }

  notifyUserWithTrackingLinkTweet(tweetID: string, name: string, ID: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const message = " Your complaint has been approved by the complaints manager. Here's the link to track it: " + "https://domain.com/" + ID;
    return this.http.post('https://pacific-wildwood-35781.herokuapp.com/reply_tweet', { id: tweetID, name: name, msg: message }, {headers:headers}) 
 }

  notifyUserOfComplaintDeletionDM(complaint) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const message = "We're sorry to inform you that your complaint \n \nLocation:" + complaint.Location + "Type: " + complaint.Type + "Body: " + complaint.Body + "\n \nmade on " + new Date(complaint.Timestamp) + " was rejected by the complaints manager. To have your complaint approved successfully make sure you fill out the details properly and don't spam it. Thank you for reaching us.";
    return this.http.post('https://pacific-wildwood-35781.herokuapp.com/direct_messages', { id: complaint.IssuerID, message: message }, {headers:headers});
  }

  notifyUserOfComplaintDeletionTweet(complaint) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const message = " We're sorry to inform you that your complaint was rejected by the complaints manager. To have your complaint approved successfully make sure you fill out the details properly and don't spam it. Thank you for reaching us.";
    return this.http.post('https://pacific-wildwood-35781.herokuapp.com/reply_tweet', { id: complaint.tweet_id, name: complaint.IssuerUsername, msg: message }, {headers:headers})    
 }

 sendFBMessage(id: string, message) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://pacific-wildwood-35781.herokuapp.com/send_fb_msg', { id: id,msg: message }, {headers:headers})    
 }

}
