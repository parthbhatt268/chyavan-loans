import { Banknote, Building2, Landmark, PiggyBank } from "lucide-react";

const banks = [
  { name: "HDFC Bank", icon: <Building2 className="h-8 w-8 text-blue-600" /> },
  { name: "Axis Bank", icon: <PiggyBank className="h-8 w-8 text-blue-800" /> },
  { name: "ICICI Bank", icon: <Banknote className="h-8 w-8 text-blue-400" /> },
  { name: "State Bank of India", icon: <Landmark className="h-8 w-8 text-blue-700" /> },
  { name: "Punjab National Bank", icon: <Building2 className="h-8 w-8 text-red-600" /> },
  { name: "Bank of Baroda", icon: <PiggyBank className="h-8 w-8 text-yellow-600" /> },
  { name: "Kotak Mahindra Bank", icon: <Banknote className="h-8 w-8 text-purple-600" /> },
  { name: "IndusInd Bank", icon: <Landmark className="h-8 w-8 text-blue-500" /> },
  { name: "IDFC First Bank", icon: <Building2 className="h-8 w-8 text-orange-600" /> },
  { name: "Yes Bank", icon: <PiggyBank className="h-8 w-8 text-green-600" /> },
  { name: "Federal Bank", icon: <Banknote className="h-8 w-8 text-red-700" /> },
  { name: "RBL Bank", icon: <Landmark className="h-8 w-8 text-blue-900" /> },
  { name: "AU Small Finance Bank", icon: <Building2 className="h-8 w-8 text-purple-700" /> },
  { name: "IDBI Bank", icon: <PiggyBank className="h-8 w-8 text-blue-500" /> },
  { name: "Bank of India", icon: <Banknote className="h-8 w-8 text-yellow-700" /> },
];

const BanksWeWorkWith = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Banks We Work With</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We have strong partnerships with India's leading banks to bring you the best loan options
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {banks.map((bank, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="p-3 bg-gray-50 rounded-full mb-3">
                {bank.icon}
              </div>
              <h3 className="font-medium text-gray-900">{bank.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BanksWeWorkWith;
