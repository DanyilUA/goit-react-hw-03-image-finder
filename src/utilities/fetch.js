
const BASE_URL = 'https://pixabay.com/api';



export function imageFetch(inputValue, pageNumber) {
  return fetch(
    `${BASE_URL}/?q=${inputValue}&page=${pageNumber}&key=37452121-a108d404886ded7cf81df8024&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => res.json());
}