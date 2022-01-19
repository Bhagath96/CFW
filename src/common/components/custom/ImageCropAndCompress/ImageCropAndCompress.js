import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Components, I18n } from '../../../components';
import LoadingCustomOverlay from '../LoadingOverlay';
import swlt from 'sweetalert2';

import Resizer from 'react-image-file-resizer';
import { IMAGE_COMPRESS_REPEAT_COUNT } from '../../../constants';

const { Dialog } = Components;
function generateFile(canvas, crop, fileName) {
    return new Promise((resolve) => {
        canvas.toBlob(
            (blob) => {
                blob.name = fileName;
                resolve(blob);
            },
            'image/jpeg',
            1
        );
    });
}

const resizeFile = (file, width, height, quality = 100) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            width,
            height,
            'JPEG',
            quality,
            0,
            (uri) => {
                resolve(uri);
            },
            'blob',
            width, height
        );
    });

const ImageCropAndCompress = ({ img, width = 1200, height = 630, setUploadImageUrl, setUploadImage }) => {

    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: 'px', aspect: width / height, x: 0, y: 0, width });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [isOpen, setIsOpen] = useState(img?.url);
    const [isLoading, setIsLoading] = useState(false);

    const onLoad = useCallback((image) => {
        imgRef.current = image;
    }, []);

    useEffect(() => {
        setIsOpen(true);
    }, [img]);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const cropImg = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;
        canvas.width = cropImg.width * pixelRatio * scaleX;
        canvas.height = cropImg.height * pixelRatio * scaleY;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            cropImg.x * scaleX,
            cropImg.y * scaleY,
            cropImg.width * scaleX,
            cropImg.height * scaleY,
            0,
            0,
            cropImg.width * scaleX,
            cropImg.height * scaleY
        );

    }, [completedCrop]);

    const handleCompress = async () => {
        setIsLoading(true);
        let file = await generateFile(previewCanvasRef.current, completedCrop, img?.fileName).then((res) => {
            return res;
        }).catch(() => {
            setIsOpen(false);
        });
        let count = 100;
        let newFile = file;
        let repeactCount = 0;
        do {
            newFile = await resizeFile(file, width, height, count).then(res => res);
            count--;
            if (count === 1) {
                repeactCount++;
                file = newFile;
                count = 100;
            }
            if (repeactCount > IMAGE_COMPRESS_REPEAT_COUNT) {
                swlt.fire({
                    title: I18n.t('image_is_not_supported'),
                    confirmButtonText: I18n.t('ok')
                });
                break;
            }
        } while (newFile?.size > 200000);
        const url = URL.createObjectURL(newFile);
        const convertedFile = new File([newFile], img?.fileName);

        setUploadImage(convertedFile);
        setUploadImageUrl(url);
        setIsLoading(false);
        setIsOpen(false);
    };
    return (
        <Dialog
            open={isOpen}
            title={I18n.t('crop_image')}
            body={<div style={{ wordBreak: 'break-all', objectFit: 'contain' }}>
                <LoadingCustomOverlay active={isLoading}>
                    <ReactCrop
                        src={img?.url}
                        onImageLoaded={onLoad}
                        crop={crop}
                        // locked={true}
                        keepSelection={true}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                    />
                    <canvas
                        ref={previewCanvasRef}
                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                        style={{
                            display: 'none',
                            width: Math.round(completedCrop?.width ?? 0),
                            height: Math.round(completedCrop?.height ?? 0)
                        }}
                    />
                </LoadingCustomOverlay>
            </div>}
            onOk={() => handleCompress()}
            onCancel={() => setIsOpen(false)}
            cancelText={'cancel'}
            okText={I18n.t('crop_and_compress')}
            isOPen={isOpen}
        >
        </Dialog>
    );
};

export default ImageCropAndCompress;
