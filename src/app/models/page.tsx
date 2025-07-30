"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { allModels } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

type Model = typeof allModels[0];

export default function ModelsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const specialties = useMemo(() => ["all", ...new Set(allModels.map(m => m.specialty))], []);
  const locations = useMemo(() => ["all", ...new Set(allModels.map(m => m.location))], []);

  const filteredModels = useMemo(() => {
    return allModels.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = specialtyFilter === "all" || model.specialty === specialtyFilter;
      const matchesLocation = locationFilter === "all" || model.location === locationFilter;
      return matchesSearch && matchesSpecialty && matchesLocation;
    });
  }, [searchTerm, specialtyFilter, locationFilter]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Our Muses</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our roster of world-class talent. Use the filters to find the perfect model for your project.
        </p>
      </div>

      <div className="bg-card p-4 rounded-lg mb-12 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map(s => <SelectItem key={s} value={s}>{s === 'all' ? 'All Specialties' : s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(l => <SelectItem key={l} value={l}>{l === 'all' ? 'All Locations' : l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {filteredModels.map((model: Model) => (
            <motion.div
              key={model.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/models/${model.id}`}>
                <Card className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer h-full flex flex-col">
                  <CardContent className="p-0 flex-shrink-0">
                    <Image
                      src={model.imageUrl}
                      alt={`Portrait of ${model.name}`}
                      data-ai-hint="male model portrait"
                      width={400}
                      height={500}
                      className="object-cover w-full h-96 transition-transform duration-300 group-hover:scale-105"
                    />
                  </CardContent>
                  <CardFooter className="p-4 bg-card flex-grow flex flex-col items-start">
                    <p className="font-bold text-lg font-headline">{model.name}</p>
                    <p className="text-sm text-muted-foreground">{model.specialty}</p>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredModels.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No models match your criteria.</p>
        </div>
      )}
    </div>
  );
}
