export const filterReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        filteredProducts: [...action.payload],
        products: [...action.payload],
      };
    case "filterMethod":
      const { products, keyWord, name } = action.payload;
      let tempFiltered = [...products];

      if (name === "search") {
        tempFiltered = tempFiltered.filter((item, i) => {
          const { title } = item.attributes;
          return title.toLowerCase().includes(keyWord.toLowerCase());
        });
      }
      return {
        ...state,
        filteredProducts: [...tempFiltered],
      };
    case "sorting":
      let sortValue;
      if (action.payload.target === "sort") {
        let sortForm = document.getElementById("sort");
        sortValue = sortForm.options[sortForm.selectedIndex].value;
      }
      return {
        ...state,
        sort_value: sortValue,
      };

    case "sorted_product":
      let newSortedData = [...action.payload];
      if (state.sort_value === "lowest") {
        newSortedData = newSortedData.sort((a, b) => {
          return a.attributes.price - b.attributes.price;
        });
      }
      if (state.sort_value === "higest") {
        newSortedData = newSortedData.sort((b, a) => {
          return a.attributes.price - b.attributes.price;
        });
      }
      if (state.sort_value === "a_z") {
        newSortedData = newSortedData.sort((a, b) => {
          return a.attributes.title.localeCompare(b.attributes.title);
        });
      }
      if (state.sort_value === "z_a") {
        newSortedData = newSortedData.sort((b, a) => {
          return a.attributes.title.localeCompare(b.attributes.title);
        });
      }
      if (state.sort_value === "earphone") {
        newSortedData = newSortedData.filter((item, i) => {
          return item.attributes.category.a === "earphone";
        });
      }
      if (state.sort_value === "Headphone") {
        newSortedData = newSortedData.filter((item, i) => {
          return item.attributes.category.a === "Headphone";
        });
      }
      if (state.sort_value === "Mobile") {
        newSortedData = newSortedData.filter((item, i) => {
          return item.attributes.category.a === "Mobile";
        });
      }
      if (state.sort_value === "Laptop") {
        newSortedData = newSortedData.filter((item, i) => {
          return item.attributes.category.a === "Laptop";
        });
      }

      return {
        ...state,
        filteredProducts: newSortedData,
      };

    default:
      return state;
  }
};
