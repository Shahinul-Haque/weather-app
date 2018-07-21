const yargs = require('yargs');
const axios = require('axios');


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



  var encodeAddress = encodeURIComponent(argv.address);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;
     
      axios.get(geocodeUrl).then((response) => {
      if (response.data.status === 'ZERO_RESULTS') {
         throw new Error('Unable to find that address.');
     }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng; 
    console.log('Address : ',response.data.results[0].formatted_address);

     var weatherUrl=`https://api.darksky.net/forecast/c7d0898707b55216ea74e830c0db5842/${lat},${lng}`
    
     return axios.get(weatherUrl).then((response)=>{
     var temperature = response.data.currently.temperature;
     var apparentTemperature = response.data.currently.apparentTemperature;
     var summary = response.data.hourly.summary;
   
     console.log(`Its currently ${temperature}. Its feel like ${apparentTemperature}.Its summary ${summary}`);
   })  
  }).catch((e)=>{
     if(e.code === 'ENOTFOUND'){
      console.log('Unable to connect to API servers');
     }else{
      console.log(e.message);
     }
  });
  