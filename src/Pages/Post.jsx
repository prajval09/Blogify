import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../Appwrite/Config/Config";
import Button from '../Components/Button' 
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Container } from "../Components";
Container
// import Components from "../Components";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.data);
    console.log(post);
    const isAuthor = post && userData ? post.UserId === userData.$id : false;

    const [lnk, setlnk] = useState('')

    useEffect(() => {
        
             
        if (slug) {
            service.Getdocument(slug).then((post) => {
                if (post){
                    setPost(post);
                    service.Getfilepreview(post.Image).then((url) =>{setlnk(url.href);});
                } 
                    
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.DeletePost(post.$id).then((status) => {
            if (status) {
                service.Deletefile(post.Image);
                navigate("/");
            }
        });
    };

    return post ?(
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={lnk}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgcolor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgcolor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.Title}</h1>
                </div>
                <div className="browser-css">
                    {/* {console.log(post.Content)} */}
                    {parse(post.Content)}
                    </div>
            </Container>
        </div>
    ) : <>null</>;
}