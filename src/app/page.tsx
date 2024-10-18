"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Category, getCategoryList } from "@/services/axios";
import {
  Card,
  CardBody,
  Heading,
  Button,
  Image,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoryList();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="bg-gray-100 p-8 shadow-sm text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Icon
            icon="mdi:noodles"
            color="red"
            width="20"
            height="20"
            className="w-6 h-6 md:w-8 md:h-8"
          />
          <Icon
            icon="mdi:pizza"
            color="red"
            width="20"
            height="20"
            className="w-6 h-6 md:w-8 md:h-8"
          />
          <Icon
            icon="mdi:rice"
            color="red"
            width="20"
            height="20"
            className="w-6 h-6 md:w-8 md:h-8"
          />
        </div>
        <h1 className="text-sm text-gray-400 mb-4 md:text-lg">
          CMLABS API Website
        </h1>
        <p className="text-black text-2xl font-bold mb-10 md:text-4xl md:mb-16">
          See All The Delicious Foods
        </p>
      </div>
      <div className="p-2 md:p-16 content-center">
        <SimpleGrid
          columns={{ base: 2, md: 2, lg: 4 }}
          spacing={{ base: 4, lg: 8 }}
        >
          {categories?.map((category) => (
            <Card maxW="sm" key={category.idCategory}>
              <CardBody>
                <Box position="relative">
                  <Image src={category.strCategoryThumb} borderRadius="lg" />
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
                    {category.strCategory}
                  </Heading>
                </Box>
                <Link href={`/list-meals/${category.strCategory}`}>
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
          ))}
        </SimpleGrid>
      </div>
    </>
  );
}
