import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import styles from "./style.css";
import Button from "../../components/Button";

const Task = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [samImage, setSamImage] = useState("");
  
  const history = useHistory();
  
  const home = () => {
    history.push("/home");
  };
  const fileSelectedHandler = event => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      setSamImage(e.target.result);
    };
    setSelectedFile(files[0]);
  };
  return (
    <>
      <div className={styles.task}>
        <input type="file" onChange={fileSelectedHandler}></input>
        <img src={samImage} />
        <h1>Тестовое задание</h1>
        <h2>
          Разработать прототип blog-сайта. Должна быть возможность
          создать/редактировать/удалить/просматривать посты (поля title,
          content, status[new, open, closed], tags) и добавлять/просматривать
          комментарии к посту (поля content, email) и загружать/просматривать
          картинки к посту. Использовать ООП, голый PHP (без бекенд
          фреймворков), MySQL. Будет плюсом если реализовать через ajax запросы
          (чтобы все изменения происходили без перезагрузки страницы) или
          применить vue js после разработки нужно разместить свой блог на
          бесплатном хостинге и прислать исходники.
        </h2>
        <Button handleClick={home} theme="edit">
          Home
        </Button>
      </div>
    </>
  );
};
export default Task;
