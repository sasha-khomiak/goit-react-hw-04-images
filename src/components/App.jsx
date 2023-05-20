import { useState } from 'react';

// підключаємо бібліотеку http-запитів axios
import axios from 'axios';

// підключаємо бібліотеку повідомлень react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// підключення компонентів
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Loader from './Loader/Loader';
import Button from './Button';

// стилізація App
import { AppWrap } from './App.styled';

// головний компонент
export const App = () => {
  //
  //наш стейт в який закидаємо комбінацію пошуку з форми
  // imagesArray - масив для рендерингу
  // query - пошуковий запит після сабміту
  // showModal - чи показуємо модалку
  // imageLink - лінк фотографії в модалці
  // page - номер сторінки, за замовчанням 1
  // showBtnLoadMore - чи показувати кнопку завантажити ще
  // isLoading - чи показувати лоадер
  const [imagesArray, setImagesArray] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const [page, setPage] = useState(1);
  const [showBtnLoadMore, setShowBtnLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // що робити з отриманими даними при натиску кнопки SUBMIT у формі
  // викликати ф-ію, яка стирає imagesArray на пустий і скидає page на 1
  // записує значення пошукового запиту тут в state App в поле query
  // викликає функцію запиту на сервер за комбінацією запиту і пергою сторінкою
  const onSubmitSearchBtn = toFind => {
    if (toFind === query) {
      toast(`ви повторно намагаєтесь знайти картинки про: "${toFind}"!`);
      return;
    }
    setImagesArray([]);
    setPage(1);
    setQuery(toFind);
    getFromAPI(toFind, 1);
  };

  // при натиску кнопки LOAD_MORE
  // ми викликаємо функцію яка повертає ше картинок за запитом із збільшеним на 1 номером сторінки
  // в стейт перезаписуємо сторінку + 1
  const loadMorePictures = () => {
    getFromAPI(query, page + 1);
    setPage(prevPage => prevPage + 1);
  };

  // асинхронний метод для отримання результатів API запиту і що робити з ними
  async function getFromAPI(toFind, page) {
    // параметри для запиту
    const API_KEY = '34781743-09d11a08c8aa729d147b2c9f6';
    const BASE_URL = 'https://pixabay.com/api/';

    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
    });
    // зібраний повний URL для запиту
    const URL = `${BASE_URL}?key=${API_KEY}&q=${toFind}&page=${page}&${searchParams}`;

    // одразу вмикаємо лоадер записавши в state isLoading - true
    setIsLoading(true);
    //
    // виконуємо запит на отримання картинок
    const response = await axios.get(URL);
    //
    // якщо немає жодного збігу, то виводимо про це повідомлення
    // і скидаємо стейт до початкового стану (query, page, showBtnLoadMore), щоб не засмічувався
    if (response.data.totalHits < 1) {
      toast(`За запитом "${toFind}" результатів нема!`);
      setPage(1);
      setQuery('');
      setShowBtnLoadMore(false);
    }
    //
    //Якщо у нас є результати для показу, то треба
    // записати (розпилити) в стейт imagesArray отриманий масив
    else if (response.data.hits.length !== 0) {
      setImagesArray(prevImagesArray => [
        ...prevImagesArray,
        ...response.data.hits,
      ]);

      //
      //рахуємо чи є ще на сервері фотографії.
      //тобто чи треба показувати кнопку "завантажити ще" (статус showBtnLoadMore)
      // для цього кількість результатів у одному запиті множимо на поточний номер сторінки
      // і отримуємо кількість уже отриманих на компі картинок
      // на сервері лишаються ще картинки, якщо ця цифра менше за response.data.totalHits
      const alreadyDownloaded = 12 * page;
      if (alreadyDownloaded < response.data.totalHits) {
        // перше повідомлення, якщо це перший виведений результат
        if (page === 1) {
          toast(
            `За запитом "${toFind}" знайдено картинок: ${response.data.totalHits}. Натисни "завантажити ще", щоб отримати ще 12 картинок!`
          );
        }
        // повідомлення, якщо отримуємо другий чи подальший результат
        else {
          const moreImages = response.data.totalHits - alreadyDownloaded;
          toast(
            `За запитом "${toFind}" лишилося ще картинок: ${moreImages} із ${response.data.totalHits}. Натисни "завантажити ще", щоб отримати ще 12 картинок!`
          );
        }
        // оскільки на сервері ще є картинки, то показуємо кнопку завантажити ще
        setShowBtnLoadMore(true);
      }
      // якщо ж на сервері більше не лишилося картинок, то виводимо про це повідомлення і прибираємо кнопку LoadMore
      else {
        toast(
          `Це всі результати за запитом "${toFind}". Більше результатів нема!`
        );
        setShowBtnLoadMore(false);
      }
    }
    // коли закінчили всю обробку, то прибираємо лоадер
    setIsLoading(false);
  }

  // рендеринг нашої верстки
  // якшо в стейт isLoading, то вантажимо лоадер
  // ToastContainer - куди виводяться повідомлення
  // Searchbar - форма для пошуку
  //ImageGallery - рендеримо тільки якщо в стейт є query
  //Button  - рендеримо тільки якщо в стейт showBtnLoadMore - true
  //Modal - рендеримо тільки якщо в стейт showModal - true
  // модалка бере картинку зі стейт imageLink
  return (
    <AppWrap>
      {isLoading && <Loader />}
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={onSubmitSearchBtn} />
      {query && (
        <ImageGallery
          imagesArray={imagesArray}
          setShowModal={setShowModal}
          setImageLink={setImageLink}
        />
      )}
      {showBtnLoadMore && <Button loadMorePictures={loadMorePictures} />}
      {showModal && <Modal imageLink={imageLink} setShowModal={setShowModal} />}
    </AppWrap>
  );
};
