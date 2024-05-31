"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardComponents from "../components/CardComponent";

export default function People() {
  const [searchTerm, setSearchTerm] = useState("");
  const [people, setPeople] = useState<any[]>([]);
  const [api, setApi] = useState("");
  const fetchData = async (
    searchTerm: any,
    link = `http://localhost:5000/api/characters`
  ) => {
    try {
      const response = await axios.get(link, {
        params: {
          search: searchTerm,
        },
      });
      console.log("Fetched data:", response.data); // Add this line
      setPeople(response.data);
      setApi(response.data);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };
  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between people-box">
      <Header />
      <div className="pt-10">
        <h1 className="text-2xl font-bold text-center mb-4">People</h1>
        <div className="grow max-md:hidden mr-4 mb-6">
          <input
            type="text"
            placeholder="Search by character name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-2 border-white rounded-[0.6rem] w-full h-[2.5rem] pl-[.9rem]"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
          {people?.map((person: any) => (
            <CardComponents
              key={person?._id} // Ensure this key exists
              title={person?.name?.toString()}
              characteristics={"gender"}
              characteristicsContent={person?.gender?.toString()}
              secondCharacteristics={"birth year"}
              secondCharacteristicsContent={person?.birth_year?.toString()}
              thirdCharacteristics={"hair color"}
              thirdCharacteristicsContent={person?.hair_color?.toString()}
              // img={planet.img}
            />
          ))}
        </div>
      </div>
      <Pagination fetchData={fetchData} api={api} name={"people"} />
      <Footer />
    </main>
  );
}
