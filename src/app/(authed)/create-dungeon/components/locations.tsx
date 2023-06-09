"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import { IPostLocation } from "@/services/dndService";
import { Dispatch, SetStateAction, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export interface LocationsProps {
  locations: IPostLocation[];
  setLocations: Dispatch<SetStateAction<IPostLocation[]>>;
}

const Locations = ({ locations, setLocations }: LocationsProps) => {
  const [status, setStatus] = useState<"LIST" | "CREATING" | "EDITING">("LIST");
  const [currentLocation, setCurrentLocation] = useState<Partial<IPostLocation>>();
  const [editIndex, setEditIndex] = useState(-1);

  return (
    <div className="w-full h-full">
      {status === "LIST" && (
        <div className="flex flex-col gap-8 w-full h-full">
          {locations.length > 0 && (
            <div className="flex flex-col gap-8 w-full overflow-y-auto no-scrollbar">
              {locations.map((loc, i) => (
                <div
                  key={`${loc.name}${i}`}
                  className="w-full bg-white/5 flex flex-row items-center p-4 gap-4"
                >
                  <p className="w-full text-2xl font-medium tracking-widest">
                    {i + 1}. {loc.name}
                  </p>
                  <MdEdit
                    className="text-white/75 cursor-pointer hover:text-warning transition-colors duration-300"
                    size={32}
                    onClick={() => {
                      setEditIndex(i);
                      setCurrentLocation(loc);
                      setStatus("EDITING");
                    }}
                  />

                  <MdDelete
                    className="text-white/75 cursor-pointer hover:text-error transition-colors duration-300"
                    size={32}
                    onClick={() => setLocations(locations.filter((_, j) => i !== j))}
                  />
                </div>
              ))}
            </div>
          )}

          <p className="text-xl tracking-[0.07em] text-white/50">
            Create between 3 and 4 locations
          </p>

          <Button
            variant="outline"
            disabled={locations.length >= 4}
            className="w-fit px-8"
            onClick={() => {
              setStatus("CREATING");
              setCurrentLocation({});
            }}
          >
            ADD NEW LOCATION
          </Button>
        </div>
      )}
      {status !== "LIST" && (
        <div className="flex flex-col h-full gap-8">
          <div className="flex flex-row gap-8 h-full">
            <div className="flex flex-col basis-1/3 gap-8 h-full min-h-0">
              <Input
                label="Name"
                value={currentLocation?.name || ""}
                onChange={(e) =>
                  setCurrentLocation({
                    ...currentLocation,
                    name: e.target.value,
                  })
                }
                className="m-0"
              />
              <div className="flex min-h-0 h-full">
                <TextArea
                  label="Mission"
                  value={currentLocation?.mission || ""}
                  disableResize
                  onChange={(e) =>
                    setCurrentLocation({
                      ...currentLocation,
                      mission: e.target.value,
                    })
                  }
                  className="m-0 h-full"
                />
              </div>
            </div>
            <div className="flex min-h-0 basis-1/3 h-full">
              <TextArea
                label="Description"
                value={currentLocation?.description || ""}
                disableResize
                onChange={(e) =>
                  setCurrentLocation({
                    ...currentLocation,
                    description: e.target.value,
                  })
                }
                className="m-0 h-full"
              />
            </div>
            <div className="flex min-h-0 basis-1/3 h-full">
              <TextArea
                label="Transition"
                value={currentLocation?.transition || ""}
                disableResize
                onChange={(e) =>
                  setCurrentLocation({
                    ...currentLocation,
                    transition: e.target.value,
                  })
                }
                className="m-0 h-full"
              />
            </div>
          </div>
          <div className="flex flex-row justify-end gap-8">
            <Button
              className="font-medium tracking-[0.08em] w-fit text-white/50 uppercase"
              variant="ghost"
              onClick={() => {
                setCurrentLocation({});
                setStatus("LIST");
                setEditIndex(-1);
              }}
            >
              CANCEL
            </Button>
            <Button
              className="w-fit px-8"
              variant="outline"
              onClick={() => {
                if (status === "CREATING") {
                  setLocations([...locations, currentLocation as IPostLocation]);
                } else {
                  setLocations(
                    locations.map((loc, i) =>
                      i === editIndex ? (currentLocation as IPostLocation) : loc,
                    ),
                  );
                }
                setEditIndex(-1);
                setCurrentLocation({});
                setStatus("LIST");
              }}
            >
              {status === "CREATING" ? "ADD LOCATION" : "EDIT LOCATION"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Locations;
