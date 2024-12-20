import React, { useState } from "react";
import leftIcon from "@/assets/left.svg";
import openNewIcon from "@/assets/open-new.svg";
import openNewIcon2 from "@/assets/open-new2.svg";
import checkmarkIcon from "@/assets/check-mark.svg";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

type Provider = {
  AttestationDownLoadEndpoint: string;
  Device: string;
  Geolocation: string;
  InputPrice: number;
  Model: string;
  Name: string;
  OutputPrice: number;
  ProviderAddress: string;
  ServiceType: string;
  URL: string;
  UpdatedAt: string;
  Uptime: string;
  Verifiability: string;
};

type ModelData = {
  Name: string;
  Author: string;
  Description: string;
  HuggingFaceURL: string;
  Price: string;
  Providers: Provider[];
  Type: string;
  UserInteractedNumber: number;
  Verifiability: string;
  ZGAlignmentScore: string;
};

interface ModelDetailProps {
  modelData: ModelData;
  onBack: () => void;
  onConfirm: (modelName: string, providerName: string) => void;
}

const ModelDetail: React.FC<ModelDetailProps> = ({
  modelData,
  onBack,
  onConfirm,
}) => {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleRowClick = (provider: Provider) => {
    setSelectedProvider(provider);
    onOpen();
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center mb-2">
        <img src={leftIcon} alt="Logo" className="w-4 h-4 mt-1" />
        <div
          className="cursor-pointer text-xl text-[#B14EFF] font-semibold"
          onClick={onBack}
        >
          Models
        </div>
        <span className="mx-2">/</span>
        <span className="text-xl font-semibold">{modelData.Name}</span>
      </div>

      <div className="mb-6 text-base text-[#374151]">
        All information and deployment options for this model.
      </div>

      {/* Model Information */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-2xl font-medium text-black mb-4">
          {modelData.Name}
        </h2>
        <div className="flex justify-between items-center border-[#D1D5DB] py-4 mb-4 border-t-1">
          <div className="text-left">
            <div className="text-[#EC6AB7] text-[40px] font-semibold">
              {modelData.Price}
            </div>
            <div className="text-black text-lg font-medium">Per 1M Tokens</div>
          </div>
          <div className="text-left">
            <div className="text-[#EC6AB7] text-[40px] font-bold">
              {modelData.ZGAlignmentScore}
            </div>
            <div className="text-black text-lg font-medium">
              0G Alignment Score
            </div>
          </div>
          <div className="text-left">
            <div className="text-[#EC6AB7] text-[40px] font-bold">
              {modelData.UserInteractedNumber.toLocaleString()}
            </div>
            <div className="text-black text-lg font-medium">
              Users interacted with model
            </div>
          </div>
          <div></div>
        </div>
        <p className="text-black text-lg mb-2">{modelData.Description}</p>
        <div className="flex items-center space-x-1 mt-6">
          <a
            href={modelData.HuggingFaceURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#B14EFF] font-semibold text-lg hover:text-[#B14EFF] hover:underline #B14EFF] flex items-center"
          >
            Huggingface
          </a>
          <img
            src={openNewIcon}
            alt="Open in new tab"
            className="w-5 h-5 mt-1"
          />
        </div>
      </div>

      {/* Service Providers */}
      <h3 className="text-[20px] text-[#111827] font-semibold mb-4">
        Service Providers
      </h3>

      <div className="overflow-x-auto shadow-lg rounded-2xl">
        <table className="w-full bg-white ">
          <thead>
            <tr className="text-left border-b border-gray-300 text-lg font-semibold text-[#141414]">
              <th className="px-4 py-[15px]">Service Providers</th>
              <th className="px-4 py-[15px]">Device</th>
              <th className="px-4 py-[15px]">Geolocation</th>
              <th className="px-4 py-[15px]">Uptime</th>
              <th className="px-4 py-[15px]">Verifiability Type</th>
              <th className="px-4 py-[15px]">Price</th>
            </tr>
          </thead>
          <tbody>
            {modelData.Providers.map((provider, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } text-[#484848] text-lg border-b border-gray-200 cursor-pointer`}
                onClick={() => handleRowClick(provider)}
              >
                <td className="px-4 py-4">{provider.Name}</td>
                <td className="px-4 py-4">{provider.Device}</td>
                <td className="px-4 py-4">{provider.Geolocation}</td>
                <td className="px-4 py-4">{provider.Uptime}</td>
                <td className="px-4 py-4 flex items-center space-x-2">
                  <span
                    className={`flex items-center px-1 py-1 rounded-full ${
                      ["ZKML", "TeeML"].includes(provider.Verifiability)
                        ? "font-bold"
                        : "font-normal"
                    }`}
                  >
                    {provider.Verifiability}
                  </span>
                  {["ZKML", "TeeML"].includes(provider.Verifiability) && (
                    <>
                      <img
                        src={checkmarkIcon}
                        alt="Checkmark"
                        className="w-6 h-6"
                      />
                      <img
                        src={openNewIcon2}
                        alt="Open in new tab"
                        className="w-6 h-6"
                      />
                    </>
                  )}
                </td>
                <td className="px-4 py-2">${provider.InputPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProvider && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          hideCloseButton={true}
          className="p-6 rounded-lg bg-white"
        >
          <ModalContent className="rounded-3xl border-1 p-6">
            {(onClose) => (
              <>
                <ModalHeader className="flex justify-center mb-3 text-black ">
                  <h2 className="text-2xl font-semibold text-center">
                    Confirmation
                  </h2>
                </ModalHeader>
                <ModalBody className="space-y-4">
                  <div>
                    <p className="text-base font-bold">Model Details:</p>
                    <p className="text-base font-normal">{modelData.Name}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold">
                      Service Provider Details:
                    </p>
                    <p className="text-base font-normal">
                      Device: {selectedProvider.Device}
                    </p>
                    <p className="text-base font-normal">
                      Geolocation: {selectedProvider.Geolocation}
                    </p>
                    <p className="text-base font-normal">
                      Service Provider: {selectedProvider.Name}
                    </p>
                  </div>
                  <div>
                    <p className="text-base font-bold mb-2">Pricing:</p>
                    <div className="p-4 border border-[#0000004D] rounded-lg w-48">
                      <p className="text-[#E51AF7] text-sm font-bold">
                        ${selectedProvider.InputPrice}
                      </p>
                      <p className="text-[#E51AF7] text-sm">per 1M tokens</p>
                      <p className="text-xs text-gray-500">
                        Pay as you go, with cost based on actual usage.
                      </p>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter className="flex justify-between">
                  <Button
                    className="text-[#FF1CE6] bg-white border border-[#FF1CE6] rounded-full"
                    onClick={onClose}
                    fullWidth
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-[#FF1CE6] text-white rounded-full"
                    onClick={() => {
                      onClose();
                      onConfirm(modelData.Name, selectedProvider.Name);
                    }}
                    fullWidth
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default ModelDetail;
