"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getMealDetail, MealDetail } from "@/services/axios";
import {
  Image,
  List,
  ListItem,
  ListIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  HStack,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRightIcon, CheckCircleIcon } from "@chakra-ui/icons";

export default function ListMeal({
  params: { id },
}: {
  params: { id: string };
}) {
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMealDetail = async (id: string) => {
    try {
      setLoading(true);
      const mealDetail = await getMealDetail(id);
      setMeal(mealDetail);
    } catch (error) {
      console.error("Error fetching meal detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealDetail(id);
  }, [id]);

  return (
    <>
      <div className="p-2 md:px-16 md:pt-12">
        <div className="flex space-x-4 mb-2 md:mb-6">
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Category</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href={`/list-meals/${meal?.strCategory}`}>
                {meal?.strCategory}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" color="gray.500">
                {meal?.strMeal}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <h1 className="text-black text-2xl font-bold mb-2 md:text-4xl md:mb-12">
          {meal?.strMeal}
        </h1>
        <Divider borderColor="gray.700" />
      </div>
      <div className="p-2 md:px-16">
        <p className="text-rose-600 font-bold text-lg mb-2 md:text-2xl md:mb-0">
          {meal?.strArea} Cullinary
        </p>
      </div>
      <HStack
        className="px-2 py-1 md:px-16"
        alignItems={"flex-start"}
        spacing={{ base: 4, md: 10 }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Image
          src={meal?.strMealThumb}
          boxSize={{ base: "100%", md: "500px" }}
          borderRadius="lg"
        />
        <VStack alignItems={"flex-start"} spacing={3}>
          <Text className="text-lg md:text-4xl" fontFamily={"sans-serif"}>
            Instructions
          </Text>
          {meal?.strInstructions.split("\n").map((paragraph, index) => (
            <Text
              key={index}
              className="text-sm md:text-base"
              fontFamily="sans-serif"
            >
              {paragraph}
            </Text>
          ))}
          <Text className="text-lg md:text-4xl" fontFamily={"sans-serif"}>
            Recipes
          </Text>
          <List spacing={2}>
            {Array.from({ length: 19 }, (_, index) => {
              const ingredient =
                meal?.[`strIngredient${index + 1}` as keyof MealDetail];
              const measure =
                meal?.[`strMeasure${index + 1}` as keyof MealDetail];
              if (!ingredient && !measure) {
                return null;
              }
              return (
                <ListItem key={index}>
                  <HStack spacing={2}>
                    {measure && (
                      <Text
                        className="text-xs md:text-sm"
                        fontFamily="sans-serif"
                      >
                        {measure}
                      </Text>
                    )}
                    {ingredient && (
                      <Text
                        className="text-xs md:text-sm"
                        fontFamily="sans-serif"
                      >
                        {ingredient}
                      </Text>
                    )}
                  </HStack>
                </ListItem>
              );
            })}
          </List>
        </VStack>
      </HStack>
      <VStack className="p-2 md:px-16" spacing={3}>
        <Text className="text-xl md:text-6xl">Tutorials</Text>
        {meal?.strYoutube && (
          <Box
            as="iframe"
            width={{ base: "100%", md: "860px" }}
            height={{ base: "100%", md: "515px" }}
            src={meal.strYoutube.replace("watch?v=", "embed/")}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </VStack>
    </>
  );
}
