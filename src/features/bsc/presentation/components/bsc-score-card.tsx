import { FormControl } from "@mui/material";
import { LinearProgress } from '@mui/material';
import { BSCSentenceRadioButton } from './bsc-sentence-radio-button';

export function BSCScoreCardPage() {
  return (
    <main className="lg:w-[60%] bg-paper mx-auto h-auto font-['Varela_Round'] text-sm rounded my-6 md:w-[70%] w-[80%]">
      <div
        className="text-center text-secondary rounded-xl h-[20vh] bg-white mb-3 
            border-t-[16px] border-solid border-secondary flex justify-evenly items-center flex-col"
      >
        <h1 className="text-2xl sm:text-3xl font-['Bebas_Neue'] md:text-4xl w-[85%]">
          {" "}
          Balance Score Card{" "}
        </h1>
        <p className="text-xs lg:text-sm w-[90%] sm:w-[90%]">
          Please take a few minutes to complete this form. Rate 1 as the lowest
          and 5 as the highest.
        </p>
      </div>

      <FormControl
        className="block py-10 text-xs font-light bg-white md:text-sm rounded-xl"
        sx={{ py: 5 }}
      >
        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p>
            {" "}
            1. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book?
          </p>
          <BSCSentenceRadioButton />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p>
            {" "}
            2. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book?
          </p>
          <BSCSentenceRadioButton />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p>
            {" "}
            3. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book?
          </p>
          <BSCSentenceRadioButton />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p>
            {" "}
            4. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book?
          </p>
          <BSCSentenceRadioButton />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p>
            {" "}
            5. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book?
          </p>
          <BSCSentenceRadioButton />
        </div>

        <div className="mx-[10%] flex justify-between items-center my-4">
          <button
            className="py-2 text-md text-white border rounded-lg bg-button w-[100px]"
            type="submit"
            value="prev"
          >
            Prev
          </button>
          <button
            className="py-2 text-md text-white border rounded-lg bg-button w-[100px]"
            type="submit"
            value="next"
          >
            Next
          </button>
        </div>

        <div className="w-[40%] ml-[50%] mt-[3%]">
          <LinearProgress variant="determinate" value={25} className="w-[100%] mx-auto mb-4 h-4" sx={{
              '& .MuiLinearProgress-bar1Determinate': {
                color: '#004d00',
                backgroundColor: '#004d00',
              },
              '&.MuiLinearProgress-root': {
                backgroundColor: 'gray',
                height: 8,
              },
            }}
          />
          <p className="text-xs text-center text-black"> Page 1 of 4 </p> 
        </div>
      </FormControl>
    </main>
  );
}
