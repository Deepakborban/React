import { useState, useEffect } from "react";
import BookEdit from "./BookEdit";
import axios from "axios";

function BookShow({ book, onDelete, onUpdate }) {
  const [showEdit, setShowEdit] = useState(false);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (book.title) {
        setUrl(await searchImage(book.title));
      }
    }
    fetchData();
  }, [book]);
  const handleDeleteClick = () => {
    onDelete(book.id);
  };
  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };
  const handleSubmit = (id, title) => {
    setShowEdit(false);
    onUpdate(id, title);
  };
  let content = <h3>{book.title}</h3>;
  if (showEdit) {
    content = <BookEdit book={book} onSubmit={handleSubmit} />;
  }
  const searchImage = async (name) => {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      headers: {
        Authorization: "Client-ID P-iSv3Pf_EUgtnlWjPnJ3f6jLfl5Abkhwv1Wn7Zn590",
      },
      params: {
        query: name,
      },
    });
    return response.data.results[0].urls.small;
  };

  return (
    <div className="book-show">
      <img alt="books" src={url} />
      <div>{content}</div>
      <div className="action">
        <button className="delete" onClick={handleDeleteClick}></button>
        <button className="edit" onClick={handleEditClick}></button>
      </div>
    </div>
  );
}
export default BookShow;
