import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-gray-800">
          歡迎來到扭蛋機
        </h1>
        <p className="text-xl text-gray-600">
          基於 Three.js 打造的精美 3D 扭蛋機體驗
        </p>
        <Link
          href="/gashapon"
          className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
        >
          開始體驗
        </Link>
      </div>
    </main>
  );
}
