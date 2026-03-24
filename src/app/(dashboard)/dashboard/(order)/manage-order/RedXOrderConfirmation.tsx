import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { divisionDistrictsjson } from "./divisionDistricts";
import { useHandleUpdateDeliveryInformationMutation } from "@/redux/features/order/orderApi";

// Types
interface Area {
  id: string;
  name: string;
  post_code: string;
  division_name: string;
  district_name: string;
}

// Constants
const REDX_API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5NzQyMzkiLCJpYXQiOjE3NDg4MDQxNDgsImlzcyI6IjJic0JkQ0phcXI2MEk5bVhweEpJdVVzbUxpNHEzZ28xIiwic2hvcF9pZCI6OTc0MjM5LCJ1c2VyX2lkIjo5MDk3MzV9.Eo-7gLF9xm_fEh5DmdOsyoTG1y9f0V1boAtBMYNESKQ"; // You may want to move this to .env or a secure config
const REDX_API_URL = "https://openapi.redx.com.bd/v1.0.0-beta/areas";

export default function RedXOrderConfirmation({itemId}: {itemId: string}) {
  const [handleUpdateDeliveryInfo, { isLoading }] =
    useHandleUpdateDeliveryInformationMutation();
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [areaList, setAreaList] = useState<Area[]>([]);
  const [filteredAreas, setFilteredAreas] = useState<Area[]>([]);
  const [searchText, setSearchText] = useState("");
  // const [areaId, setAreaId] = useState<number>(0);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  // console.log(areaList, "🚀 Area List from RedX API");
  // console.log(selectedArea, "🚀 Filtered Areas based on selection");
  // Fetch areas from RedX API
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(REDX_API_URL, {
          headers: { "API-ACCESS-TOKEN": REDX_API_TOKEN },
        });
        setAreaList(response.data?.areas || []);
      } catch (error) {
        console.error("❌ Error fetching RedX areas:", error);
        setAreaList([]);
        toast.error("Failed to load area list from RedX.");
      }
    };

    fetchAreas();
  }, []);

  // Filter areas by division and district
  useEffect(() => {
    if (selectedDivision && selectedDistrict) {
      const filtered = areaList.filter(
        (area) =>
          area.division_name === selectedDivision &&
          area.district_name === selectedDistrict
      );
      setFilteredAreas(filtered);
    } else {
      setFilteredAreas([]);
    }
    setSelectedArea(null);
  }, [selectedDivision, selectedDistrict, areaList]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-green-600 text-white hover:bg-green-800">
          Confirm Order
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm this order?</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-4">
              {/* Division Selector */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select Division
                </label>
                <select
                  className="border p-2 w-full"
                  value={selectedDivision}
                  onChange={(e) => {
                    setSelectedDivision(e.target.value);
                    setSelectedDistrict("");
                  }}
                >
                  <option value="">-- Choose Division --</option>
                  {Object.keys(divisionDistrictsjson).map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Selector */}
              {selectedDivision && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select District
                  </label>
                  <select
                    className="border p-2 w-full"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                  >
                    <option value="">-- Choose District --</option>
                    {divisionDistrictsjson[
                      selectedDivision as keyof typeof divisionDistrictsjson
                    ].map((district: string) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Area Autocomplete Field */}
              {selectedDistrict && (
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">
                    Select Area
                  </label>
                  <input
                    type="text"
                    placeholder="Search area"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);

                      const filtered = areaList.filter(
                        (area) =>
                          (!selectedDivision ||
                            area.division_name === selectedDivision) &&
                          (!selectedDistrict ||
                            area.district_name === selectedDistrict) &&
                          area.name
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                      );
                      setFilteredAreas(filtered);
                    }}
                    className="border p-2 w-full rounded"
                  />

                  {searchText && filteredAreas.length > 0 && (
                    <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-60 overflow-y-auto shadow-md mt-1 rounded">
                      {filteredAreas.map((area) => (
                        <li
                          key={area.id}
                          onClick={() => {
                            setSelectedArea(area);
                            setSearchText(`${area.name} (${area.post_code})`);
                            setFilteredAreas([]);
                          }}
                          className="p-2 hover:bg-green-100 cursor-pointer text-sm"
                        >
                          {area.name} ({area.post_code})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {filteredAreas.length < 1 && (
            <AlertDialogAction
              className="bg-green-600 text-white hover:bg-green-800"
              onClick={async () => {
                const payload = {
                  area: selectedArea?.name || "",
                  division_name: selectedArea?.division_name || "",
                  district_name: selectedArea?.district_name || "",
                  area_id: selectedArea?.id.toString() || "",
                };
                try {
              
                  await handleUpdateDeliveryInfo({payload,id:itemId}).unwrap();
                  toast.success("Order confirmed successfully!");
                } catch (error) {
                  console.error("❌ Error confirming order:", error);
                  toast.error("Failed to confirm order.");
                }
              }}
            >
            {isLoading ? "Confirming..." : "Confirm Order"}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
