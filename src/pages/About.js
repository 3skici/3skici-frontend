import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "../features/stats/statsSlice";

const AboutUs = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.stats);
  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-[#fff1f4] text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="p-10">
          {/* Header Section */}
          <header className="text-center">
            <h1 className="text-4xl font-extrabold text-[#C02244]">
              {t("welcome_to_3skici")}
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
              {t("welcome_description")}
            </p>
          </header>

          {/* Mission Section */}
          <section className="bg-gradient-to-r from-[#C02244] to-[#c34867] p-8 rounded-lg shadow-lg mt-12 text-white">
            <h2 className="text-2xl font-semibold text-center">
              {t("our_mission")}
            </h2>
            <p className="mt-4">{t("mission_description")}</p>
          </section>

          {/* Our Key Features Section */}
          <section className="py-12 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {t("our_key_features")}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              {t("discover_features")}
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { key: "blazing_fast", icon: "⚡" },
                { key: "highly_customizable", icon: "⚙️" },
                { key: "scalable_infrastructure", icon: "📈" },
                { key: "secure_and_reliable", icon: "🔒" },
                { key: "enterprise_grade", icon: "🏢" },
                { key: "support_24_7", icon: "🛠️" },
                { key: "seamless_integration", icon: "🔗" },
                { key: "accelerate_innovation", icon: "🚀" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center border-t-4 border-[#C02244]"
                >
                  <div className="text-4xl mb-3 text-[#C02244]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#C02244]">
                    {t(feature.key)}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {t(feature.key + "_description")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-6">
            <h2 className="text-2xl font-semibold text-[#C02244] text-center">
              {t("how_it_works")}
            </h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { key: "for_sellers" },
                { key: "for_buyers" },
                { key: "transaction_process" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#C02244]"
                >
                  <h3 className="text-xl font-semibold text-[#C02244]">
                    {t(item.key)}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {t(item.key + "_description")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Unique Features Section */}
          <section>
            <h2 className="text-3xl text-center mt-8 font-extrabold text-gray-900">
              {t("our_key_features")}
            </h2>
            <div className="mt-6 space-y-4 bg-gray-50 p-8 my-4 rounded-lg shadow-lg">
              {[
                "free_for_users",
                "direct_communication",
                "simple_accessible",
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <span className="text-[#C02244] text-xl">✔</span>
                  <p className="text-gray-700">{t(feature)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3skici Numbers Section */}
          <section className="mx-auto py-12">
            <h2 className="text-3xl font-bold text-[#C02244] mb-4 text-center">
              {t("3skici_numbers")}
            </h2>
            <div className="flex flex-wrap justify-center gap-40 text-center">
              {[
                { numbers: stats.users, key: "active_users" },
                { numbers: stats.products, key: "items_for_sale" },
                { numbers: stats.categories, key: "categories" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-50 w-44 h-44 rounded-full justify-items-center text-center p-9 shadow-md border-x-4 border-y-4 border-[#C02244]"
                >
                  <h3 className="text-2xl font-bold text-[#C02244] mb-4">
                    {stat.numbers}
                  </h3>
                  <p> {t(stat.key)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Report Fake or Inappropriate Products Section */}
          <section className="py-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              {t("report_fake_products")}
            </h2>
            <p className="text-gray-700 bg-gray-50 p-8 rounded-lg shadow-lg text-lg py-12 mt-8">
              {t("report_fake_products_description")}
            </p>
          </section>

          {/* Call to Action Section */}
          <section className="text-center mt-12">
            <h2 className="text-3xl font-bold text-[#C02244]">
              {t("join_community")}
            </h2>
            <button className="mt-6 bg-[#C02244] text-white py-3 px-8 rounded-lg hover:bg-red-700 transition shadow-md">
              {t("start_shopping")}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

// import React from "react";

// const AboutUs = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className=" py-12 px-6 sm:px-8 lg:px-16">
//             <div className="max-w-7xl mx-auto space-y-12">
//               {/* Header Section */}
//               <header className="text-center">
//                 <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
//                   Welcome to <span className="text-blue-500">3skici</span>
//                 </h1>
//                 <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
//                   The platform dedicated to connecting sellers and buyers of
//                   second-hand products seamlessly. Join us for a completely
//                   free, simple, and transparent way to buy and sell pre-loved
//                   items.
//                 </p>
//               </header>

//               {/* Mission Section */}
//               <section className="bg-white p-8 rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-semibold text-gray-800">
//                   Our Mission
//                 </h2>
//                 <p className="mt-4 text-gray-700">
//                   At 3skici, our mission is to empower people to make smarter,
//                   more sustainable buying decisions by connecting them with
//                   others who have what they need. We aim to simplify the process
//                   of buying and selling second-hand goods, creating an
//                   accessible and enjoyable experience for everyone.
//                 </p>
//               </section>

//               {/* How It Works Section */}
//               <section>
//                 <h2 className="text-2xl font-semibold text-gray-800">
//                   How It Works
//                 </h2>
//                 <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//                   {/* For Sellers */}
//                   <div className="bg-red-500 p-6 rounded-lg shadow-md">
//                     <h3 className="text-xl font-semibold text-white">
//                       For Sellers
//                     </h3>
//                     <p className="mt-2 text-slate-200">
//                       Listing items is easy and completely free. Register, log
//                       in, and create your listing with clear descriptions and
//                       images. It’s that simple!
//                     </p>
//                   </div>
//                   {/* For Buyers */}
//                   <div className="bg-teal-700 p-6 rounded-lg shadow-md">
//                     <h3 className="text-xl font-semibold text-gray-800">
//                       For Buyers
//                     </h3>
//                     <p className="mt-2 text-slate-200">
//                       Browse items freely, contact sellers directly, and make
//                       informed purchases. No account required for browsing or
//                       buying!
//                     </p>
//                   </div>
//                   {/* Transaction Process */}
//                   <div className="bg-orange-300 p-6 rounded-lg shadow-md">
//                     <h3 className="text-xl font-semibold text-slate-100">
//                       Transaction Process
//                     </h3>
//                     <p className="mt-2 text-slate-200">
//                       Transactions are handled directly between buyers and
//                       sellers. Clear communication and verification are key to a
//                       successful purchase.
//                     </p>
//                   </div>
//                 </div>
//               </section>

//               {/* Our Unique Features Section */}
//               <section className="w-full py-12 md:py-24 lg:py-32">
//                 <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
//                   <div className="space-y-3">
//                     <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                       Our Key Features
//                     </h2>
//                     <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
//                       Discover the powerful features that make our platform the
//                       best choice for your business.
//                     </p>
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
//                     <div className="flex flex-col items-center gap-4">
//                       <div className="bg-gray-100 rounded-full p-4 dark:bg-gray-800 dark:text-blue-200 dark:text-blue-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           stroke-width="2"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           className="w-8 h-8 text-primary"
//                         >
//                           <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
//                           <circle cx="12" cy="12" r="4"></circle>
//                         </svg>
//                       </div>
//                       <div className="grid gap-2">
//                         <h3 className="font-semibold">Blazing Fast</h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                           Our platform delivers lightning-fast performance,
//                           ensuring your users have a seamless experience.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-center gap-4">
//                       <div className="bg-gray-100 rounded-full p-4 dark:bg-gray-800 dark:text-blue-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           stroke-width="2"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           className="w-8 h-8 text-primary"
//                         >
//                           <polyline points="18 8 22 12 18 16"></polyline>
//                           <polyline points="6 8 2 12 6 16"></polyline>
//                           <line x1="2" x2="22" y1="12" y2="12"></line>
//                         </svg>
//                       </div>
//                       <div className="grid gap-2">
//                         <h3 className="font-semibold">Highly Customizable</h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                           Tailor our platform to your unique needs and
//                           preferences with our extensive customization options.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-center gap-4">
//                       <div className="bg-gray-100 rounded-full p-4 dark:bg-gray-800 dark:text-blue-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           stroke-width="2"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           className="w-8 h-8 text-primary"
//                         >
//                           <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
//                         </svg>
//                       </div>
//                       <div className="grid gap-2">
//                         <h3 className="font-semibold">
//                           Scalable Infrastructure
//                         </h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                           Our robust infrastructure scales seamlessly to handle
//                           your growing needs, ensuring uninterrupted service.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-center gap-4">
//                       <div className="bg-gray-100 rounded-full p-4 dark:bg-gray-800 dark:text-blue-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           stroke-width="2"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           className="w-8 h-8 text-primary"
//                         >
//                           <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
//                           <path d="m9 12 2 2 4-4"></path>
//                         </svg>
//                       </div>
//                       <div className="grid gap-2">
//                         <h3 className="font-semibold">Secure and Reliable</h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                           Your data and applications are protected by our robust
//                           security measures, giving you peace of mind.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-center gap-4">
//                       <div className="bg-gray-100 rounded-full p-4 dark:bg-gray-800 dark:text-blue-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           stroke-width="2"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           className="w-8 h-8 text-primary"
//                         >
//                           <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
//                           <rect
//                             width="20"
//                             height="14"
//                             x="2"
//                             y="6"
//                             rx="2"
//                           ></rect>
//                         </svg>
//                       </div>
//                       <div className="grid gap-2">
//                         <h3 className="font-semibold">Enterprise-Grade</h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                           Our platform is built to handle the demands of
//                           large-scale businesses, ensuring enterprise-level
//                           performance.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-center gap-4">
//                       <div className="bg-gray-100 rounded-full p-4 dark:bg-gray-800 dark:text-blue-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           stroke-width="2"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           className="w-8 h-8 text-primary"
//                         >
//                           <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
//                         </svg>
//                       </div>
//                       <div className="grid gap-2">
//                         <h3 className="font-semibold">24/7 Support</h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                           Our dedicated support team is available around the
//                           clock to assist you with any questions or issues.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-center gap-4">
//                       <div className="bg-gray-100 rounded-full p-4 dark:bg-gray-800 dark:text-blue-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           stroke-width="2"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           className="w-8 h-8 text-primary"
//                         >
//                           <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
//                           <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path>
//                           <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path>
//                         </svg>
//                       </div>
//                       <div className="grid gap-2">
//                         <h3 className="font-semibold">Seamless Integration</h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                           Our platform seamlessly integrates with your existing
//                           tools and workflows, ensuring a smooth transition.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-center gap-4">
//                       <div className="bg-gray-100 rounded-full p-4 dark:bg-gray-800 dark:text-blue-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           stroke-width="2"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           className="w-8 h-8 text-primary"
//                         >
//                           <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
//                           <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
//                           <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
//                           <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
//                         </svg>
//                       </div>
//                       <div className="grid gap-2">
//                         <h3 className="font-semibold">Accelerate Innovation</h3>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </section>

//               {/* Our Unique Features Section */}
//               <section className="bg-gray-50 p-8 rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-semibold text-gray-800">
//                   Our Unique Features
//                 </h2>
//                 <div className="mt-6 space-y-4">
//                   <div className="flex items-start space-x-4">
//                     <span className="text-blue-500 text-xl">✔</span>
//                     <p className="text-gray-700">
//                       Completely Free for Sellers and Buyers: No fees, no hidden
//                       charges. Everything is transparent and cost-free.
//                     </p>
//                   </div>
//                   <div className="flex items-start space-x-4">
//                     <span className="text-blue-500 text-xl">✔</span>
//                     <p className="text-gray-700">
//                       Direct Communication: Buyers can contact sellers directly
//                       through the product listings for smooth transactions.
//                     </p>
//                   </div>
//                   <div className="flex items-start space-x-4">
//                     <span className="text-blue-500 text-xl">✔</span>
//                     <p className="text-gray-700">
//                       Simple & Accessible: No account required for browsing and
//                       buying. Registration is only needed for selling and
//                       reporting issues.
//                     </p>
//                   </div>
//                 </div>
//               </section>

//               {/* Returns Policy Section */}
//               <section className="bg-white p-8 rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-semibold text-gray-800">
//                   Returns Policy
//                 </h2>
//                 <p className="mt-4 text-gray-700">
//                   Please note that there is no return policy on 3skici.
//                   Transactions are made directly between buyers and sellers. We
//                   encourage users to communicate clearly before completing any
//                   purchase.
//                 </p>
//               </section>

//               {/* Delivery Service Section */}
//               <section className="bg-gray-50 p-8 rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-semibold text-gray-800">
//                   Delivery Service (Coming Soon!)
//                 </h2>
//                 <p className="mt-4 text-gray-700">
//                   We’re working on developing a delivery service to make the
//                   buying process even more convenient for you. Stay tuned as we
//                   roll out this feature in the near future!
//                 </p>
//               </section>

//               {/* 3skici in Numbers Section */}
//               <section className="mb-16 bg-white shadow rounded-lg p-8 border-l-4 border-orange-500">
//                 <h2 className="text-3xl font-bold text-orange-600 mb-4 flex items-center">
//                   <span className="material-icons mr-2">3skici numbers</span>
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                   <div className="bg-gray-50 shadow-inner rounded-lg p-6 text-center">
//                     <h3 className="text-2xl font-bold text-gray-800">1,999</h3>
//                     <p className="text-gray-600">Active Users</p>
//                   </div>
//                   <div className="bg-gray-50 shadow-inner rounded-lg p-6 text-center">
//                     <h3 className="text-2xl font-bold text-gray-800">567</h3>
//                     <p className="text-gray-600">Items for Sale</p>
//                   </div>
//                   <div className="bg-gray-50 shadow-inner rounded-lg p-6 text-center">
//                     <h3 className="text-2xl font-bold text-gray-800">890</h3>
//                     <p className="text-gray-600">Successful Transactions</p>
//                   </div>
//                 </div>
//               </section>

//               {/* Report Fake or Inappropriate Products Section */}
//               <section className="bg-gray-50 p-8 rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-semibold text-gray-800">
//                   Report Fake or Inappropriate Products
//                 </h2>
//                 <p className="mt-4 text-gray-700">
//                   If you come across a product that seems fake or inappropriate,
//                   you can easily report it. Our team will review your report and
//                   take necessary actions to maintain a safe and trustworthy
//                   environment for all users.
//                 </p>
//               </section>

//               {/* Call to Action Section */}
//               <section className="text-center mt-12">
//                 <h2 className="text-3xl font-semibold text-gray-800">
//                   Join the 3skici Community
//                 </h2>
//                 <p className="mt-4 text-lg text-gray-600">
//                   Ready to buy or sell with purpose? Get started now and be part
//                   of the change.
//                 </p>
//                 <div className="mt-6">
//                   <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
//                     Start Shopping
//                   </button>
//                 </div>
//               </section>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;
