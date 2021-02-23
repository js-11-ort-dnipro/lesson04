
    const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/ovdp?json';
   
    fetch(URL)
        .then(answer => answer.json())
        .then(data => {

            /*
                В середине этой функции вам доступна переменная data
                хранящая данные по размещенным облигациям внутреннего займа
            */

            const today = '2021-02-23';

            data = data.map(item => ({

                d: item.repaydate.split('.').reverse().join('-'),
                s: item.valcode == 'USD' 
                    ? item.attraction * 28 
                    : (item.valcode == 'EUR' 
                        ? item.attraction * 33 
                        : item.attraction)

            })).filter(item => item.d > today && item.s).reduce((acc, item) => {
                acc[item.d] = acc[item.d] ? acc[item.d] + item.s : item.s;
                return acc; 
            }, {});

            data = Object.entries(data).sort((a, b) => a[0] > b[0] ? 1 : -1);

            
            console.log(data);

            
             //outputPlace.innerHTML = '...Result...';

        });

   
	