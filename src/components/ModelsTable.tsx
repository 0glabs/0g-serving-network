import basicIcon from "@/assets/basic.svg";
import secureIcon from "@/assets/secure.svg";
import ultraSecureIcon from "@/assets/ultra-secure.svg";
import infoIcon from "@/assets/info.svg";

type Model = {
  Name: string;
  Author: string;
  Type: string;
  Price: string;
  ZGAlignmentScore: string;
  Verifiability: string;
  UserInteractedNumber: number;
};

interface ModelsTableProps {
  models: Model[];
  onModelClick: (modelName: string) => void;
}

const ModelsTable: React.FC<ModelsTableProps> = ({ models, onModelClick }) => {
  const columns = [
    { key: "Name", label: "Models" },
    { key: "Author", label: "Author" },
    { key: "Type", label: "Type" },
    { key: "Price", label: "Pricing (per 1M Tokens)" },
    { key: "ZGAlignmentScore", label: "0G Alignment Score" },
    { key: "Verifiability", label: "Verifiability Type" },
  ];

  return (
    <div className="overflow-x-auto shadow-lg rounded-2xl">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="text-left">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-[15px] border-b font-semibold text-lg text-[#141414]"
              >
                <div className="flex items-center">
                  {col.label}
                  <img
                    src={infoIcon}
                    alt="Info Icon"
                    className="w-4 h-4 ml-1 mt-1"
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr
              key={model.Name}
              className="border-b hover:bg-gray-50 cursor-pointer text-lg text-[#484848]"
              onClick={() => onModelClick(model.Name)}
            >
              <td className="px-6 py-4">{model.Name}</td>
              <td className="px-6 py-4">{model.Author}</td>
              <td className="px-6 py-4">{model.Type}</td>
              <td className="px-6 py-4">{model.Price}</td>
              <td className="px-6 py-4">{model.ZGAlignmentScore}</td>
              <td className="px-6 py-4 flex items-center space-x-1">
                {model.Verifiability === "ZKML" && (
                  <img
                    src={ultraSecureIcon}
                    alt="ZKML Icon"
                    className="w-9 mr-1"
                  />
                )}
                {model.Verifiability === "TeeML" && (
                  <img src={secureIcon} alt="TeeML Icon" className="w-9 mr-1" />
                )}
                {model.Verifiability === "OpML" && (
                  <img src={basicIcon} alt="OpML Icon" className="w-9 mr-1" />
                )}
                <span
                  className={`flex items-center px-3 py-1 italic ${
                    ["ZKML", "TeeML"].includes(model.Verifiability)
                      ? " font-bold"
                      : "font-normal"
                  }`}
                >
                  {model.Verifiability}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModelsTable;
