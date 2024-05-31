"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardComponents from "../components/CardComponent";

export default function Starship() {
  const [starships, setStarships] = useState<any[]>([]);
  const [api, setApi] = useState({
    totalPages: 0,
    currentPage: 1,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (
    searchTerm: any,
    page = 1,
    limit = 10,
    link = `http://localhost:5000/api/starships`
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
      // Ensure we handle cases where response.data.results is not defined
      setStarships(response.data.results || []);
      setApi({
        totalPages: response.data.totalPages || 0,
        currentPage: response.data.currentPage || 1,
      });
    } catch (error) {
      console.error("Error fetching starships:", error);
      setStarships([]); // Set starships to an empty array in case of error
    }
  };

  useEffect(() => {
    fetchData(searchTerm, api.currentPage);
  }, [searchTerm, api.currentPage]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between galaxy-box">
      <Header />
      <div className="pt-10">
        <h1 className="text-2xl font-bold text-center mb-4">Starships</h1>
        <div className="grow max-md:hidden mr-4 mb-6">
          <input
            type="text"
            placeholder="Search by starship name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-2 bg-transparent rounded-[0.6rem] w-full h-[2.5rem] pl-[.9rem]"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
          {starships.length > 0 ? (
            starships.map((starship: any) => (
              <CardComponents
                key={starship?.url}
                title={starship?.name?.toString()}
                characteristics={"model"}
                characteristicsContent={starship?.model?.toString()}
                secondCharacteristics={"manufacturer"}
                secondCharacteristicsContent={starship?.manufacturer?.toString()}
                thirdCharacteristics={"cost in credits"}
                thirdCharacteristicsContent={starship?.cost_in_credits?.toString()}
              />
            ))
          ) : (
            <p>No starships found</p>
          )}
        </div>
      </div>
      <Pagination fetchData={fetchData} api={api} name={"starships"} />
      <Footer />
    </main>
  );
}
