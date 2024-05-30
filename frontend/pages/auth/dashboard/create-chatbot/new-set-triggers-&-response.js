import FlowChartComponent from "@/components/create_chatbot/new-tR-page/FlowChartComponent";


const New_set_triggers_and_response = () => {
  
  return (
    <div className="flex justify-between items-start w-full gap-1 px-5 pt-5 bg-[#dce9ff] h-[85vh]">
      <div className="w-full max-w-full h-full pr-0 flex justify-between relative">
        <div className="w-full">
          <FlowChartComponent />
        </div>
       
      </div>
    </div>
  );
};

export default New_set_triggers_and_response;
