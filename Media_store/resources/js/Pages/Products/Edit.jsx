import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Head, Link, useForm } from "@inertiajs/react";
import TextAreaInput from "@/Components/TextAreaInput";
import Select from "@/Components/Select";

const Edit = ({ product, alert, success }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: product.name || "",
        image: "",
        type: product.type || "",
        description: product.description || "",
        price: Math.round(product.price / 1000) || 0,
        in_stock: product.in_stock || 0,
        genre: product.genre || "",
        _method: "PUT",
    });

    const [img, setImg] = React.useState(product.image_path);

    const genres = [
        "fiction",
        "comedy",
        "drama",
        "action",
        "horror",
        "romance",
        "thriller",
    ];

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("products.update", product.id));
    };
    return (
        <>
            <Head title="Products" />

            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <div className="breadcrumbs">
                            <ul>
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Media store
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("products.manage")}
                                        className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Manage products
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route(
                                            "products.edit",
                                            product.id
                                        )}
                                        className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        {`Edit "${product.name}"`}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {alert && (
                        <div className="toast toast-top toast-center">
                            <div
                                className={`alert ${
                                    success ? "alert-success" : "alert-error"
                                }`}
                            >
                                <span>{alert}</span>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-wrap justify-center">
                            <div className="md:w-1/3 w-full max-w-3xl self-center mb-4">
                                <div className="flex items-center justify-center">
                                    <img
                                        src={img}
                                        alt="Product image"
                                        className="w-48 object-cover rounded-lg"
                                    />
                                </div>
                            </div>

                            <form
                                className="grid grid-cols-2 gap-6 md:w-2/3 w-full max-w-3xl"
                                onSubmit={onSubmit}
                            >
                                <div>
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="name"
                                            value="Product name"
                                        />
                                    </div>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="w-full opacity-75 cursor-not-allowed"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        type="text"
                                        placeholder="Enter product name"
                                        disabled={true}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="image"
                                            value="Product image (less than 1024kB)"
                                        />
                                    </div>
                                    <TextInput
                                        id="image"
                                        name="image"
                                        type="file"
                                        className="w-full file-input"
                                        onChange={(e) => {
                                            setData("image", e.target.files[0]);
                                            setImg(
                                                URL.createObjectURL(
                                                    e.target.files[0]
                                                )
                                            );
                                        }}
                                    />
                                    <InputError message={errors.image} />
                                </div>

                                <div className="col-span-2">
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Product description"
                                        />
                                    </div>
                                    <TextAreaInput
                                        id="description"
                                        name="description"
                                        className="w-full"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    ></TextAreaInput>
                                    <InputError message={errors.description} />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="price"
                                            value="Product price (thousand VND)"
                                        />
                                    </div>
                                    <TextInput
                                        className="w-full"
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        placeholder="10"
                                    />
                                    <InputError message={errors.price} />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="stock"
                                            value="Quantity in stock"
                                        />
                                    </div>
                                    <TextInput
                                        className="w-full"
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        min="0"
                                        value={data.in_stock}
                                        onChange={(e) =>
                                            setData("in_stock", e.target.value)
                                        }
                                        placeholder="10"
                                    />
                                    <InputError message={errors.in_stock} />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="type"
                                            value="Product type"
                                        />
                                    </div>
                                    <Select
                                        disabled={true}
                                        className="w-full opacity-75 cursor-not-allowed"
                                        id="type"
                                        name="type"
                                        value={data.type}
                                        onChange={(e) =>
                                            setData("type", e.target.value)
                                        }
                                    >
                                        <option>Select type...</option>
                                        <option value="book">Book</option>
                                        <option value="cd">Compact disc</option>
                                        <option value="dvd">
                                            Digital video disc
                                        </option>
                                    </Select>
                                    <InputError message={errors.type} />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="genre"
                                            value="Product genre"
                                        />
                                    </div>
                                    <Select
                                        className="w-full"
                                        id="genre"
                                        name="genre"
                                        value={data.genre}
                                        onChange={(e) =>
                                            setData("genre", e.target.value)
                                        }
                                    >
                                        <option>Select genre...</option>
                                        {genres.map((genre) => (
                                            <option key={genre} value={genre}>
                                                {genre}
                                            </option>
                                        ))}
                                    </Select>
                                    <InputError message={errors.genre} />
                                </div>

                                <div className="flex items-center justify-end gap-2 col-span-2">
                                    <button
                                        className="btn btn-outline btn-success"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Submit
                                    </button>
                                    <Link
                                        href={route("products.manage")}
                                        className="btn btn-outline btn-warning"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Edit.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user} children={page} />
);

export default Edit;
