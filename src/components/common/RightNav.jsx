import Image from "next/image";

const items = [
    {
        id: 1,
        name: "Jon Doe",
        img: "/Ellipse1.png",
        title: "@adamsandler",
    },
    {
        id: 2,
        name: "Jon Doe",
        img: "/Ellipse1.png",
        title: "@adamsandler",
    },
    {
        id: 3,
        name: "Jon Doe",
        img: "/Ellipse1.png",
        title: "@adamsandler",
    },
    {
        id: 4,
        name: "Jon Doe",
        img: "/Ellipse1.png",
        title: "@adamsandler",
    },
    {
        id: 5,
        name: "Jon Doe",
        img: "/Ellipse1.png",
        title: "@adamsandler",
    }
]

const RightNav = () => {
    return (
        <div className="pt-10">
            <div className="flex gap-4 items-center">
                <Image className="w-14 rounded-full" src={"/Ellipse1.png"} height={100} width={100} alt="person"></Image>
                <div>
                    <h1 className="text-xl font-bold">Adam Sandler</h1>
                    <h5>@adamsandler</h5>
                </div>
            </div>
            <p className="text-xl py-6">peoples who viewed</p>
            <div>
                {
                    items.map(item => (
                        <div key={item.id} className="flex gap-4 items-center pb-4">
                            <Image className="w-14 rounded-full" src={"/Ellipse1.png"} height={100} width={100} alt="person"></Image>
                            <div>
                                <h1 className="text-xl font-bold">Adam Sandler</h1>
                                <h5>@adamsandler</h5>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default RightNav;
