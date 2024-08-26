import React from 'react';
import { Dialog, DialogContent, DialogClose } from "./ui/dialog";

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] p-0">
                <DialogClose className="absolute right-2 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    {/* <X className="h-4 w-4" /> */}
                    {/* <span className="sr-only">Close</span> */}
                </DialogClose>
                <img src={imageUrl} alt="Full size" className="w-full h-full object-contain" />
            </DialogContent>
        </Dialog>
    );
};

export default ImageModal;