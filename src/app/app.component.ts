import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mdb-angular-free';
  url: string = 'http://api.openweathermap.org/data/2.5/weather?q=london&units=Metric&appid=c51223c219d6aec8cb8c5210449bd859';
usersArray = [];
errorMessage:any;
repos:any={"city":{"id":2643743,"name":"London","coord":{"lon":-0.1257,"lat":51.5085},"country":"GB","population":1000000,"timezone":0},"cod":"200","message":6.4764489,"cnt":5,"list":[{"dt":1610539200,"sunrise":1610524851,"sunset":1610554630,"temp":{"day":5.22,"min":2.2,"max":6.68,"night":6.19,"eve":6.68,"morn":2.72},"feels_like":{"day":3.23,"night":4.67,"eve":4.75,"morn":-0.87},"pressure":1018,"humidity":97,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":1.17,"deg":266,"clouds":98,"pop":1,"rain":6.39},{"dt":1610625600,"sunrise":1610611205,"sunset":1610641121,"temp":{"day":5.64,"min":2.4,"max":8.48,"night":2.4,"eve":3.59,"morn":8.42},"feels_like":{"day":-0.4,"night":-1.88,"eve":-2.27,"morn":6.7},"pressure":1014,"humidity":88,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":6.69,"deg":81,"clouds":100,"pop":1,"rain":16.05},{"dt":1610712000,"sunrise":1610697555,"sunset":1610727613,"temp":{"day":3.46,"min":0.79,"max":3.6,"night":1.73,"eve":2.24,"morn":0.81},"feels_like":{"day":0.75,"night":-1.41,"eve":-0.38,"morn":-2.6},"pressure":1032,"humidity":74,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01d"}],"speed":0.88,"deg":67,"clouds":0,"pop":0},{"dt":1610798400,"sunrise":1610783903,"sunset":1610814107,"temp":{"day":5.07,"min":1.37,"max":6.48,"night":6.48,"eve":5.13,"morn":2.6},"feels_like":{"day":-0.45,"night":1.62,"eve":-0.7,"morn":-1.93},"pressure":1023,"humidity":71,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":5.1,"deg":189,"clouds":100,"pop":1,"rain":2.81},{"dt":1610884800,"sunrise":1610870248,"sunset":1610900602,"temp":{"day":6.47,"min":4.49,"max":7.06,"night":4.49,"eve":5.22,"morn":6.55},"feels_like":{"day":0.87,"night":0.98,"eve":1.71,"morn":-0.13},"pressure":1023,"humidity":62,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":5.11,"deg":342,"clouds":42,"pop":1,"rain":1.2}]};
cityName:any = "";
RefData=false;
dataIndex:any;
constructor(private http: HttpClient) {
 
}


getRepos(userName: string): Observable<any> {
  return this.http.get(this.url)
}

public getWeatherInfo(val) {
  if(val == 1){
  if(this.cityName == "" ){alert("Please enter city name.");return;}
   this.url  = 'http://api.openweathermap.org/data/2.5/weather?q='+this.cityName+'&units=Metric&appid=c51223c219d6aec8cb8c5210449bd859';
  }else{
  this.url = ' http://api.openweathermap.org/data/2.5/forecast/daily?q='+val+'&units=Metric&cnt=5&appid=c51223c219d6aec8cb8c5210449bd859';
  }
  this.errorMessage = "";
  this.getRepos(this.url)
    .subscribe(
      (response) => {                         
        console.log('response received');
        console.log(response);
        if(val != 1){
        this.repos = response; 
        }else{
          if(this.RefData){
            this.RefData=false;
            this.usersArray[this.dataIndex]=response;
          }else{
        this.usersArray.unshift(response);
          }
          this.cityName="";
        }
      },
      (error) => {                              
        console.warn('Request failed with error')
        this.errorMessage = error;
        alert("This city name dose not exist.");
      })
}


getDate(data){
  
  return new Date(data * 1000).getDate()
}
getStr(data){
 
  var theDate = new Date(data * 1000);
  var dateString = theDate.toDateString();
  return dateString.slice(0,3);
  // return "thu"
}

deleteItem(val){
  this.usersArray.splice(val,1);
  this.cityName=val;
}
clearAll(){
  this.usersArray=[];
}

refreshData(val,index){
  this.RefData=true;
  this.dataIndex=index; 
  this.cityName=val;
  this.getWeatherInfo(1); 
}

}