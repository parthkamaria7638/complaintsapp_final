import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'TimeRemaining'
})
export class TimeRemaining implements PipeTransform {
    transform(previous: number, currTime: number) {
        //var current = new Date().getTime();
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        if (!previous) {
            return;
        }
        else {
            var elapsed = currTime - previous;

            if (elapsed < msPerMinute) {
                return Math.round(elapsed/1000) + 's ';   
            }
    
            else if (elapsed < msPerHour) {
                return Math.round(elapsed/msPerMinute) + 'm ';   
            }
    
            else if (elapsed < msPerDay ) {
                return Math.round(elapsed/msPerHour ) + 'h ';   
            }
    
            else if (elapsed < msPerMonth) {
                return  Math.round(elapsed/msPerDay) + 'd ';   
            }
    
            else if (elapsed < msPerYear) {
                return  Math.round(elapsed/msPerMonth) + 'months ';   
            }
    
            else {
                return  Math.round(elapsed/msPerYear ) + 'y ';   
            }
        }
        
    }
}
