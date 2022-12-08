fetch('https://api.coingecko.com/api/v3/exchange_rates')
  .then(response => response.json())
  .then(json => {
    const data = [json]
    console.log(data[0].rates)
    const showData = new Data(data)
    showData.fetchApi()
  })
  .catch(err => alert(err))

class Data{
  constructor(data){
    this.data = data;
  }
  fetchApi(){
    var result = Object.keys(this.data[0].rates).map((key) =>  ([key, this.data[0].rates[key]]));

    const image = document.getElementById('loading');
    const text = document.getElementById('no-more-data');
    
    console.log(result)
    let items = 0;
    let len = 11;
    ratesData(result, items , len)

    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight){
        if(len == result.length){
          image.style.display = 'none';
          text.style.display = 'block';
          return
        }
        image.style.display = 'block';
        items = len + 1
        len += 10
        setTimeout(()=> {
          ratesData(result, items , len)
        },1000)
      }
    }  
  }
}

function ratesData(result, x, y){
  const show_fetch_data = document.getElementsByClassName('show_data')[0]
  let elem;
  // console.log(x, y)
    for(let i = x; i <= y; i++){
      elem = `
          <div class="card_data">
            <img>
            <div class="crypto-info">
                <h1>Rates: ${result[i][0]} ${i}</h1>
                <span>Crypto name:  ${result[i][1].name}</span>
                <br>
                <span>Crypt unit: ${result[i][1].unit} </span>
            </div>
          </div>`
          show_fetch_data.innerHTML += elem 
  }
}



