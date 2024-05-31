"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardComponents from "../components/CardComponent";

export default function Planet() {
  const [planets, setPlanets] = useState<any[]>([]);
  const [api, setApi] = useState({
    totalPages: 0,
    currentPage: 1,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (
    searchTerm: any,
    page = 1,
    limit = 10,
    link = `http://localhost:5000/api/planets`
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
      setPlanets(response.data.results || []);
      setApi({
        totalPages: response.data.totalPages || 0,
        currentPage: response.data.currentPage || 1,
      });
    } catch (error) {
      console.error("Error fetching planets:", error);
      setPlanets([]); // Set planets to an empty array in case of error
    }
  };

  useEffect(() => {
    fetchData(searchTerm, api.currentPage);
  }, [searchTerm, api.currentPage]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between galaxy-box">
      <Header />
      <div className="pt-10">
        <h1 className="text-2xl font-bold text-center mb-4">Planets</h1>
        <div className="grow max-md:hidden mr-4 mb-6">
          <input
            type="text"
            placeholder="Search by planet name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-2 bg-transparent rounded-[0.6rem] w-full h-[2.5rem] pl-[.9rem]"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
          {planets.length > 0 ? (
            planets.map((planet: any) => (
              <CardComponents
                key={planet?._id}
                title={planet?.name?.toString()}
                characteristics={"climate"}
                characteristicsContent={planet?.climate?.toString()}
                secondCharacteristics={"population"}
                secondCharacteristicsContent={planet?.population?.toString()}
                thirdCharacteristics={"terrain"}
                thirdCharacteristicsContent={planet?.terrain?.toString()}
              />
            ))
          ) : (
            <p>No planets found</p>
          )}
        </div>
      </div>
      <Pagination fetchData={fetchData} api={api} name={"planets"} />
      <Footer />
    </main>
  );
}
