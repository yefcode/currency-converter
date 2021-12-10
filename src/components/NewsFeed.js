import {useState, useEffect} from 'react';
import axios from "axios";

const NewsFeed = () => {

    const [articles, setArticles] = useState(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/news',
        };

        axios.request(options).then((response) => {
            setArticles(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    const first7Articles = articles?.slice(0,7);

    return (
        <>
            <h2>NewsFeed</h2>
            <div className="news-feed">
                {first7Articles?.map( (article, _index) => (
                    <div key={_index}>
                        <a href={article.url}><p>{article.title}</p></a>
                    </div>))}
            </div>
        </>
    );
}
export default NewsFeed;