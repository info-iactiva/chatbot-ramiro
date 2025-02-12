import React from "react";
import { Record } from "../../types/Record";

interface ProductCarouselProps {
  records: Record[];
}
type RecordKeysDictionary = {
  [K in keyof Record]: string;
};

const keysDictionary: RecordKeysDictionary = {
  description: "Descripción",
  type: "Tipo",
  category: "Categoría",
  tags: "Etiquetas",
  aspect1: "Aspecto 1",
  optionsAspect1: "Opciones Aspecto 1",
  aspect2: "Aspecto 2",
  optionsAspect2: "Opciones Aspecto 2",
  aspect3: "Aspecto 3",
  optionsAspect3: "Opciones Aspecto 3",
  sku: "SKU",
  weight: "Peso",
  price: "Precio",
  requiresShipping: "Requiere envío",
  imageUrl: "Imagen",
  seller: "Vendedor",
  title: "Título",
  variantAspect1: "Variante Aspecto 1",
  variantAspect2: "Variante Aspecto 2",
  variantAspect3: "Variante Aspecto 3",
  variantOptions1: "Opciones Variante 1",
  variantOptions2: "Opciones Variante 2",
  variantOptions3: "Opciones Variante 3",
};

const forbiddenKeys: (keyof Record)[] = [
  "tags",
  "aspect1",
  "optionsAspect1",
  "aspect2",
  "optionsAspect2",
  "aspect3",
  "optionsAspect3",
  "imageUrl",
  "variantAspect1",
  "variantAspect2",
  "variantAspect3",
  "variantOptions1",
  "variantOptions2",
  "variantOptions3",
  "seller",
  "sku",
  "type",
];

const ProductCarousel: React.FC<ProductCarouselProps> = ({ records }) => {

  const getKeyToDisplay = (key: keyof Record) => {
    return keysDictionary[key] || key;
  }

  return (
    <div className=" flex w-full overflow-x-auto ">
      {records.map((record, index) => (
        <div key={index} className="bg-white rounded-lg overflow-hidden mt-1 min-w-full max-w-[300px] mx-1 shadow-md hover:shadow-lg">

          {/* Título */}
          <div className="relative mb-5">
            <h3 className="text-sm font-bold text-gray-800 truncate w-full overflow-hidden whitespace-nowrap hover:overflow-visible hover:whitespace-normal hover:bg-white absolute hover:z-10 px-2 hover:shadow-lg ">
              {record.title}
            </h3>
          </div>

          <div
            key={index}
            className="w-full min-h-24 max-h-32  flex "
          >
            {/* Prioridad para la imagen */}
            {record.imageUrl && (
              <div className="h-full w-[50%]">
                <img
                  src={record.imageUrl}
                  alt={record.title}
                  className="h-full object-cover"
                />
              </div>
            )}
            {/* Contenido del producto */}
            <div className="flex ">

              {/* Descripción */}
              {/* {record.description && (
                <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-600">
                  {record.description}
                </div>
              )} */}

              {/* Propiedades adicionales */}
              <div className="flex flex-col space-y-1">
                {Object.entries(record).map(([key, value]) => {
                  if (
                    forbiddenKeys.includes(key as keyof Record) ||
                    key === "title" ||
                    key === "description"
                  )
                    return null;

                  return (
                    <p key={key} className="text-xs text-gray-600">
                      <span className="font-medium">
                        {getKeyToDisplay(key as keyof Record)}:
                      </span>{" "}
                      {typeof value === "boolean"
                        ? value
                          ? "Sí"
                          : "No"
                        : String(value)}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      ))}
    </div>
  );
};

export default ProductCarousel;



// <div className="p-2 flex-1 flex flex-col space-y-1">
// {/* Renderizado de las demás propiedades */}
// {Object.entries(record).map(([key, value]) => {
//   // Omitimos las propiedades que no queremos renderizar
//   if (forbiddenKeys.includes(key as keyof Record)) return null;
//   return (
//     <p key={key} className="text-xs text-gray-600 truncate">
//       <span className="font-bold capitalize">{getKeyToDisplay(key as keyof Record)}:</span>{" "}
//       {typeof value === "boolean"
//         ? value
//           ? "Sí"
//           : "No"
//         : String(value)}
//     </p>
//   );
// })}
// </div>