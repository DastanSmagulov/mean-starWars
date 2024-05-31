"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardComponents from "../components/CardComponent";

export default function People() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [api, setApi] = useState({
    totalPages: 0,
    currentPage: 1,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (
    searchTerm: any,
    page = 1,
    limit = 10,
    link = `${process.env.REACT_APP_SWAPI_API}/characters`
  ) => {
    try {
      const response = await axios.get(link, {
        params: {
          search: searchTerm,
          page,
          limit,
        },
      });
      console.log("Fetched data:", response.data);
      setCharacters(response.data.results || []);
      setApi({
        totalPages: response.data.totalPages || 0,
        currentPage: response.data.currentPage || 1,
      });
    } catch (error) {
      console.error("Error fetching characters:", error);
      setCharacters([]);
    }
  };

  useEffect(() => {
    fetchData(searchTerm, api.currentPage);
  }, [searchTerm, api.currentPage]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between galaxy-box">
      <Header />
      <div className="pt-10">
        <h1 className="text-2xl font-bold text-center mb-4">Characters</h1>
        <div className="grow max-md:hidden mr-4 mb-6">
          <input
            type="text"
            placeholder="Search by character name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-2 bg-transparent rounded-[0.6rem] w-full h-[2.5rem] pl-[.9rem]"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
          {characters.length > 0 ? (
            characters.map((character: any) => (
              <CardComponents
                key={character?.url}
                title={character?.name?.toString()}
                characteristics={"gender"}
                characteristicsContent={character?.gender?.toString()}
                secondCharacteristics={"birth year"}
                secondCharacteristicsContent={character?.birth_year?.toString()}
                thirdCharacteristics={"hair color"}
                thirdCharacteristicsContent={character?.hair_color?.toString()}
              />
            ))
          ) : (
            <p>No characters found</p>
          )}
        </div>
      </div>
      <Pagination fetchData={fetchData} api={api} name={"characters"} />
      <Footer />
    </main>
  );
}
