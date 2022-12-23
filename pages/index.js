import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const fileRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("/vercel.svg");
  const [file, setFile] = useState(null);

  const handleChange = () => {
    let files = fileRef.current.files;
    setFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    setFile(null);
    fileRef.current.value = "";
    const { url } = await fetch("api/uploadUrl").then((res) => res.json());
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: file,
    });

    console.log("Image url:", url);
    console.log("Image url split:", url.split("?")[0]);
    const imageUrl = url.split("?")[0];
    setImgSrc(imageUrl);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        {/* <meta name="referrer" content="same-origin" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div className="bg-red-200 w-[500px] h-[500px] grid place-items-center">
          <div className="relative w-[250px] h-[250px] bg-blue-500">
            <Image
              src={imgSrc}
              alt={"image place holder"}
              unoptimized={true}
              layout="fill"
            ></Image>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid justify-center mx-auto w-[90%] bg-green-500"
          >
            <div>
              <input
                ref={fileRef}
                type={"file"}
                onChange={handleChange}
              ></input>
            </div>
            <div className="overflow-ellipsis w-full bg-orange-600">
              imgSrc: {imgSrc}
            </div>
            <div>Name: {file?.name}</div>
            <div>
              Size: {file?.size} {file?.size && "bytes"}
            </div>
            <div>Type: {file?.type}</div>
            <div className="bg-gray-300 w-20 border-2 text-center justify-self-center">
              <button className="">Submit</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
