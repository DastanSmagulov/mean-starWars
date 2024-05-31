"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardComponents from "../components/CardComponent";
export default function Starships() {
  const [searchTerm, setSearchTerm] = useState("");
  const [api, setApi] = useState("");
  const [starship, setStarship] = useState<any[]>([]);
  const fetchData = async (
    searchTerm: any,
    link = `http://localhost:5000/api/starships`
  ) => {
    try {
      const response = await axios.get(link, {
        params: {
          search: searchTerm,
        },
      });
      console.log("Fetched data:", response.data); // Add this line
      setStarship(response.data);
      setApi(response.data);
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  };
  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);
  console.log(starship);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ship-box">
      <Header />
      <div className="pt-10">
        <h1 className="text-2xl font-bold  text-center mb-4">Starships</h1>
        <div className="grow max-md:hidden mr-4 mb-6">
          <input
            type="text"
            placeholder="поиск по названию корабля"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-2 rounded-[0.6rem] w-full h-[2.5rem] pl-[.9rem]"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
          {starship?.map((ship: any) => (
            <CardComponents
              key={ship?.id}
              title={ship?.name?.toString()}
              characteristics={"manufacturer"}
              characteristicsContent={ship?.manufacturer?.toString()}
              secondCharacteristics={"model"}
              secondCharacteristicsContent={ship?.model?.toString()}
              thirdCharacteristics={"cost in credits"}
              thirdCharacteristicsContent={ship?.cost_in_credits?.toString()}
              // img={planet.img}
            />
          ))}
        </div>
      </div>
      <Pagination fetchData={fetchData} api={api} name={"starships"} />
      <Footer />
    </main>
  );
}
