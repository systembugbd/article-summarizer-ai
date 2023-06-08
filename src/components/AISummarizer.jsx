import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick, deleteIcon } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const AISummarizer = () => {
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    const [allArticle, setAllArticle] = useState([]);
    const [copyed, setCopyed] = useState("");
    const [exists, setExists] = useState(false);
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });

    useEffect(() => {
        const articles = getLocalSArticle();

        if (articles) {
            setAllArticle(articles);
        }
    }, []);

    const getLocalSArticle = () => {
        return JSON.parse(localStorage.getItem("articles"));
    };

    const handlerSubmit = async (e) => {
        e.preventDefault();

        //check already summarize or not
        // if(allArticle){
        //     allArticle.map((item, index)=>{
        //         if(item.url == article.url){
        //             setMatched(true)
        //             setArticle({...item})
        //         } else{
        //             setMatched(false)
        //         }
        //     })
        // }

        const existingArticle = JSON.parse(localStorage.getItem("articles"));
        existingArticle &&
            existingArticle?.map((item, index) => {
                if (item.url === article.url) {
                    setExists(true);
                    setArticle(item);
                }
                return false;
            });
        if (exists) {
            return false;
        } else {
            const { data } =
                !exists &&
                (await getSummary({
                    articleUrl: article.url,
                    length: 3,
                }));
            if (data?.summary) {
                const newArticle = { ...article, summary: data?.summary };
                const updatedAllArticle = [newArticle, ...allArticle];

                setArticle(newArticle);
                setAllArticle(updatedAllArticle);

                if (!exists) {
                    localStorage.setItem(
                        "articles",
                        JSON.stringify(updatedAllArticle)
                    );
                }
            }
        }
    };

    const handleCopy = (copyUrl) => {
        setCopyed(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => {
            setCopyed("");
        }, 3000);
    };

    const handleDelete = (deleteUrl) => {
  
        const localArticle = getLocalSArticle();
        console.log(allArticle)

        const updatedAllArticle = localArticle?.filter((item) => {
           return item.url !== deleteUrl
        });
        
        setAllArticle([...updatedAllArticle]);
        localStorage.setItem(
            "articles",
            JSON.stringify(updatedAllArticle)
        );
    };
    return (
        <section className="w-full max-w-xl mt-16">
            <div className="relative">
                <form
                    className="flex items-center justify-center"
                    onSubmit={handlerSubmit}
                >
                    <img src={linkIcon} className="absolute w-5 left-5 " />
                    <input
                        type="url"
                        className=" url_input peer"
                        placeholder="Enter Your Artile URL"
                        required
                        onChange={(e) =>
                            setArticle({ ...article, url: e.target.value })
                        }
                    />
                    <button className="absolute submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
                        ↵
                    </button>
                </form>
            </div>

            <div className="flex flex-col gap-1 mt-10 overflow-y-auto max-h-60">
                {allArticle &&
                    allArticle.map((item, index) => (
                        <div
                            className={`link_card justify-start ${
                                article.url == item.url ? "selected" : ""
                            }`}
                            key={`link-${index}`}
                            onClick={() => setArticle(item)}
                        >
                            <img
                                onClick={() => handleCopy(item.url)}
                                src={copyed == item.url ? tick : copy}
                                alt="copy"
                                className="p-1 copy_btn hover:text-green-700"
                            />
                            <span className="flex-1 truncate">{item.url}</span>
                            <img
                                onClick={() => handleDelete(item.url)}
                                src={copyed == item.url ? tick : deleteIcon}
                                alt="copy"
                                className="p-1 copy_btn hover:text-green-700"
                            />
                        </div>
                    ))}
            </div>

            <div className="flex items-center justify-center max-w-full my-10">
                {isFetching ? (
                    <img src={loader} className="w-20 pt-5" />
                ) : error ? (
                    <div className="text-center">
                        <p className="font-bold text-black font-satoshi">
                            Well, That should not happen! Something went
                            wrong...
                        </p>
                        <span className="text-red-500">
                            {error?.data?.error
                                ? error?.data?.error
                                : error?.data?.message}
                        </span>
                    </div>
                ) : (
                    article.summary && (
                        <div className="summary_box">
                            <h2 className="pb-2 text-xl font-bold underline-offset-2">
                                Article
                                <span className="blue_gradient">Summary:</span>
                            </h2>
                            <p className="font-medium font-satoshi">
                                {article.summary}
                            </p>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default AISummarizer;
