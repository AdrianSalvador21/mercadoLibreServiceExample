const { response } = require('express');
const axios = require('axios').default;

const itemsGet = async (req, res = response) => {
  const {q} = req.query;
  const mlQueryUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=' + q + '&limit=4';
  await axios.get(mlQueryUrl).then(async (resp) => {
    const fullData = resp.data.results;
    const filters = resp.data.filters;
    const items = [];
    let categories = [];
    filters.forEach((filter) => {
      if (filter.id === 'category') {
        for (let i = 0; i < filter.values.length; i++) {
          categories.push(filter.values[i].name);
        }
      }
    });

    let itemsPromise = new Promise(async (resolve, reject) => {
      for (let j = 0; j < fullData.length; j++) {
        let urlItem = `https://api.mercadolibre.com/items/${fullData[j].id}`;
        await axios.get(encodeURI(urlItem)).then((itemResponse) => {
          items.push({
            id: fullData[j].id,
            title: fullData[j].title,
            price: {
              currency: fullData[j].prices.prices[0].currency_id,
              amount: fullData[j].price,
              decimals: null
            },
            picture: itemResponse.data.pictures[0].url,
            condition: fullData[j].condition,
            free_shipping: fullData[j].shipping.free_shipping,
            address_state: fullData[j].address.state_name,
            // item_data: itemResponse.data
          })
        });
      }

      resolve();
    });

    await itemsPromise.then(() => {
      res.status(200).json({
        author: {
          name: 'Adrian',
          lastname: 'Salvador'
        },
        items: items,
        categories: categories
      });
    });
  })
};


const itemsGetSegment = async (req, res = response) => {
  const id = req.params.id;
  const mlItemDataUrl = 'https://api.mercadolibre.com/items/' + id;
  const mlItemDescriptionUrl = 'https://api.mercadolibre.com/items/' + id + '/description/';
  await axios.get(mlItemDataUrl).then(async (itemRespData) => {
    axios.get(mlItemDescriptionUrl).then(async (itemDescriptionData) => {
      const itemData = itemRespData.data;
      const itemDescription = itemDescriptionData.data;
      res.status(200).json({
        author: {
          name: 'Adrian',
          lastname: 'Salvador'
        },
        item: {
          id: itemData.id,
          title: itemData.title,
          price: {
            currency: itemData.currency_id,
            amount: itemData.price,
            decimals: null
          },
          picture: itemData.pictures[0].url,
          condition: itemData.condition,
          free_shipping: itemData.shipping.free_shipping,
          description: itemDescription.plain_text,
          sold_quantity: itemData.sold_quantity
        },
      });
    });
  });
};

module.exports = {
  itemsGet,
  itemsGetSegment
};
