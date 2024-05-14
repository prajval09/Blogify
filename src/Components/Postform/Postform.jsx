import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import RTE from '../RTE'
import {Button, Input, select as Sel} from '../index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import service from '../../Appwrite/Config/Config'


function Postform({post}) {

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);


    console.log(post);
    const {register, handleSubmit,watch,control,getValues,setValue} = useForm({defaultValues:{
        Title:post?post.Title:'',
        slug: post?slugTransform(post.Title):'',
        Content: post?post.Content:'',
        status: post?post.status:'active',

    }})

    // const navigate = useNavigate()
    // const userdata = useSelector(state => state.user.userdata)

    const navigate = useNavigate();
    const userdata = useSelector((state) => state.auth.data);

    const submit = async (data) => {
        if(post){
            console.log("data");
            const file = data.Image[0]?service.Uploadfile(data.Image[0]):null

            if(file){
                service.Deletefile(post.Image)
            }

            const dbPost = await service.UpdatePost(post.$id,{
                ...data,
                Image: file ? file.$id : undefined,

            })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
        }

        else
        {
            const file = await service.Uploadfile(data.Image[0])
            if(file){
                const fileId = file.$id
                data.Image = fileId
                console.log(userdata);
                const dbPost = await service.CreatePost({
                    ...data,
                    UserId: userdata.$id,
                })
                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }

    }

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "Title") {
                setValue("slug", slugTransform(value.Title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title"
                    placeholder="Title"
                    className="mb-4"
                    {...register("Title", { required: true })}
                />
                <Input
                    label="slug"
                    placeholder="slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="Content" control={control} defaultValue={getValues("Content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("Image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.Getfilepreview(post.Image)}
                            alt={post.Title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Sel
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                    />
                <Button type="submit" bgcolor={post ? "bg-green-500" : undefined} className="w-full" >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default Postform


// export default function Postform({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             Title: post?.Title || "",
//             slug: post?.$id || "",
//             Content: post?.Content || "",
//             status: post?.status || "active",
//         },
//     });
    
//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);
    
//     const submit = async (data) => {
//         if (post) {
//             console.log("entered");
//             const file = data.image[0] ? await service.Uploadfile(data.image[0]) : null;

//             if (file) {
//                 service.Deletefile(post.Image);
//             }

//             const dbPost = await service.UpdatePost(post.$id, {
//                 ...data,
//                 Image: file ? file.$id : undefined,
//             });

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             }
//         } else {
//             const file = await service.Uploadfile(data.image[0]);

//             if (file) {
//                 const fileId = file.$id;
//                 data.Image = fileId;
//                 const dbPost = await service.CreatePost({ ...data, userId: userData.$id });

//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 }
//             }
//         }
//     };

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");

//         return "";
//     }, []);

//     React.useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "Title") {
//                 setValue("slug", slugTransform(value.Title), { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, [watch, slugTransform, setValue]);

//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("Title", { required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                     }}
//                 />
//                 <RTE label="Content :" name="Content" control={control} defaultValue={getValues("Content")} />
//             </div>
//             <div className="w-1/3 px-2">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image", { required: !post })}
//                 />
//                 {post && (
//                     <div className="w-full mb-4">
//                         <img
//                             src={service.Getfilepreview(post.Image)}
//                             alt={post.Title}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}
//                 <Sel
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("status", { required: true })}
//                 />
//                 <Button type="submit" bgcolor={post ? "bg-green-500" : undefined} className="w-full">
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     );
// }
