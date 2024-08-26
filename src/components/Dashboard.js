import React, { useState, useEffect } from 'react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { Upload, Image as ImageIcon, Trash2, Maximize2 } from "lucide-react";
import ImageModal from './ImageModal';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog";

const Dashboard = () => {
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageToDelete, setImageToDelete] = useState(null);
    const session = useSessionContext();
    const { toast } = useToast();

    useEffect(() => {
        if (session.doesSessionExist) {
            fetchImages();
        }
    }, [session.doesSessionExist]);

    const fetchImages = async () => {
        try {
            const response = await fetch('https://monster-api-backend.vercel.app/api/images', {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Images", data);
                setImages(data);
            } else {
                throw new Error('Failed to fetch images');
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch images. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast({
                title: "Error",
                description: "Please select a file to upload.",
                variant: "destructive",
            });
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('https://monster-api-backend.vercel.app/api/images/upload', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Image uploaded successfully!",
                });
                await fetchImages();
                setSelectedFile(null);
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to upload image. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async (imageId) => {
        try {
            const response = await fetch(`https://monster-api-backend.vercel.app/api/images/${imageId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Image deleted successfully!",
                });
                await fetchImages();
            } else {
                throw new Error('Failed to delete image');
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete image. Please try again.",
                variant: "destructive",
            });
        }
        setImageToDelete(null);
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Upload New Image</h2>
                    <div className="flex items-center space-x-4">
                        <Input type="file" onChange={handleFileChange} accept="image/*" />
                        <Button onClick={handleUpload} disabled={!selectedFile}>
                            <Upload className="mr-2 h-4 w-4" /> Upload
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                    <Card key={image._id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-0 relative">
                            <img
                                src={image.url}
                                alt="Uploaded"
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="flex space-x-2">
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <Maximize2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => setImageToDelete(image)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <ImageModal
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                imageUrl={selectedImage?.url}
            />

            <AlertDialog open={!!imageToDelete} onOpenChange={() => setImageToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the image.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(imageToDelete._id)}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Dashboard;