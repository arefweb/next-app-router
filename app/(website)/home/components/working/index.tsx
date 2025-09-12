import step1 from "@/assets/images/step1.png";
import step2 from "@/assets/images/step2.png";
import step3 from "@/assets/images/step3.png";
import step4 from "@/assets/images/step4.png";
import Step from './components/step';

function Working() {
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center justify-center md:pt-15">
        <h2 className="text-4xl/20 font-bold">
          How It works?
        </h2>
        <p className="text-center text-[1rem]/6 text-gray-500 max-w-[300px] ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        </p>
      </div>

      <div className="flex gap-4 px-4 flex-wrap md:flex-nowrap">
        <Step
          imgSrc={step1}
          count="STEP 1"
          title="Download"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
          className="basis-full md:basis-1/4"
        />
        <Step
          imgSrc={step2}
          count="STEP 2"
          title="Connect Wallet"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
          className="basis-full md:basis-1/4"
        />
        <Step
          imgSrc={step3}
          count="STEP 3"
          title="Start Trading"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
          className="basis-full md:basis-1/4"
        />
        <Step
          imgSrc={step4}
          count="STEP 4"
          title="Earn Money"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
          className="basis-full md:basis-1/4"
        />
      </div>
    </div>
  );
}

export default Working;