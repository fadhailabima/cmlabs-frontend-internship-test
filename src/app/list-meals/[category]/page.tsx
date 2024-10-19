"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getMealList, Meal } from "@/services/axios";
import {
  Card,
  CardBody,
  Heading,
  Image,
  SimpleGrid,
  Box,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ListMeal({
  params: { category },
}: {
  params: { category: any };
}) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMeals = async (category: string) => {
    try {
      setLoading(true);
      const { meals, categoryDescription } = await getMealList(category);
      setMeals(meals);
      setCategoryDescription(categoryDescription);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals(category);
  }, [category]);

  return (
    <>
      <div className="p-2 md:px-16 md:py-12">
        <div className="flex space-x-4 mb-2 md:mb-6">
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Category</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#" color="gray.500">
                {category}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <h1 className="text-black text-2xl font-bold mb-2 md:text-4xl md:mb-4">
          {category} Meals
        </h1>
        <p className="text-black text-sm mb-2 md:text-lg md:mb-0">
          {categoryDescription}
        </p>
      </div>
      <div className="p-2 md:p-16 content-center">
        <SimpleGrid
          columns={{ base: 2, md: 2, lg: 4 }}
          spacing={{ base: 4, lg: 8 }}
        >
          {meals?.map((meal, index) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
              index={index}
            />
          ))}
        </SimpleGrid>
      </div>
    </>
  );
}

const MealCard = ({ meal, index }: { meal: Meal; index: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card maxW="sm">
        <CardBody>
          <Box position="relative">
            <Image src={meal.strMealThumb} borderRadius="lg" />
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="gray.500"
              opacity="0.5"
              borderRadius="lg"
            />
            <Heading
              size={{ base: "sm", md: "md" }}
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              color="white"
              textAlign="center"
            >
              {meal.strMeal}
            </Heading>
          </Box>
          <Link href={`/detail-meal/${meal.idMeal}`}>
            <Button
              variant="solid"
              colorScheme="blue"
              width={"100%"}
              mt={4}
              fontSize={{ base: "sm", md: "md" }}
              padding={{ base: "8px", md: "16px" }}
              mx="auto"
            >
              View Detail
            </Button>
          </Link>
        </CardBody>
      </Card>
    </motion.div>
  );
};
