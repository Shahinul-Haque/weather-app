const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
      .options({
      	a: {
      		demand:true,
      		alias:'address',
      		string:true,
      		describe:'Address to Fetch weather far'
      	}
      })
      .help()
      .alias('help', 'h')
      .argv;

    geocode.geocodeAddress(argv.address, (errorMessage,result) => {
               
	   if(errorMessage){
	   	console.log(errorMessage);
	   }else{
	   	console.log('Address :',result.address);

	   	 weather.getWeather(result.lattitude,result.longitude,(errorMessage,weatherResult)=>{
     
		     if(errorMessage){
		     	console.log(errorMessage);
		     }else{
		     	console.log(`Its currently ${weatherResult.temperature}. Its feel like ${weatherResult.apparentTemperature}`);
		     }
		   })
	   }
   })


  
   //c7d0898707b55216ea74e830c0db5842
  

  