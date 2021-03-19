package org.apache.beam.examples;

import org.apache.beam.examples.common.ExampleUtils;
import org.apache.beam.sdk.Pipeline;
import org.apache.beam.sdk.io.TextIO;
import org.apache.beam.sdk.metrics.Counter;
import org.apache.beam.sdk.metrics.Distribution;
import org.apache.beam.sdk.metrics.Metrics;
import org.apache.beam.sdk.options.Default;
import org.apache.beam.sdk.options.Description;
import org.apache.beam.sdk.options.PipelineOptions;
import org.apache.beam.sdk.options.PipelineOptionsFactory;
import org.apache.beam.sdk.options.Validation.Required;
import org.apache.beam.sdk.transforms.Count;
import org.apache.beam.sdk.transforms.DoFn;
import org.apache.beam.sdk.transforms.MapElements;
import org.apache.beam.sdk.transforms.Max;
import org.apache.beam.sdk.transforms.PTransform;
import org.apache.beam.sdk.transforms.GroupByKey;
import org.apache.beam.sdk.transforms.ParDo;
import org.apache.beam.sdk.transforms.Sum;
import org.apache.beam.sdk.transforms.DoFn.OutputReceiver;
import org.apache.beam.sdk.transforms.SimpleFunction;
import org.apache.beam.sdk.values.KV;
import org.apache.beam.sdk.values.PCollection;
import org.apache.beam.sdk.transforms.Combine;
import org.apache.beam.sdk.transforms.MapElements;

import java.io.Serializable;
import java.util.*;




public class WordPredict {

    static String sentence = "";
    static String output = "";


    public interface WordCountOptions extends PipelineOptions {

    
        @Description("Path of the file to read from")
        @Default.String("gs://apache-beam-samples/shakespeare/kinglear.txt")
        String getInputFile();
    
        void setInputFile(String value);
    
    
      }


      // Pairs each word with up to 3 following sucessors
      //uses '-' for each single word space between this word and a sucessor
      static class NextWords extends DoFn<String, KV<String,String>> {
        @ProcessElement
        public void processElement(@Element final String in, final OutputReceiver<KV<String,String>> out) {
          // Use OutputReceiver.output to emit the output element.
         // final List<KV<String, Integer>> word_count = new ArrayList<KV<String, Integer>>();
        // System.out.println("CUSTOM PROCESSING FOR LINE: "+line);

        String s=in.replaceAll("'", "");

        String[]inArr = s.split(ExampleUtils.TOKENIZER_PATTERN);
          
          for(int i = 0; i < inArr.length;i++){
            String spacing ="";
            for(int j=1; j< 4&&i+j<inArr.length;j++){
                out.output(KV.of(inArr[i].toLowerCase(),spacing+inArr[i+j].toLowerCase()));
                spacing+="-";
            }
        

          }
         
        }
      }



      //Assigns each word-successor relationship value 1 for later grouping
      static class BaseFreqOne extends DoFn<KV<String,String>,KV<KV<String,String>,Integer>> {
        @ProcessElement
        public void processElement(@Element final KV<String,String> in, OutputReceiver<KV<KV<String,String>,Integer>>  out) {
          
             out.output(KV.of(in,1));        
         
        }
      }

                  //Pairs each word with value of following word in positon with how many occurances
      static class SortByWord extends DoFn<KV<KV<String,String>,Integer>,KV<String,KV<String,Integer>>> {
        @ProcessElement
        public void processElement(@Element final KV<KV<String,String>,Integer> in, OutputReceiver<KV<String,KV<String,Integer>>>  out) {
          
             out.output(KV.of(in.getKey().getKey(),KV.of(in.getKey().getValue(),in.getValue()) )); 

         
        }
      }

      //Return strings to normal and sort them in different arrays by their distance from the word
      static class SeperatePosition extends DoFn<KV<String,Iterable<KV<String,Integer>>>,KV<String,ArrayList<ArrayList<KV<String,Integer>>>>> {
        @ProcessElement
        public void processElement(@Element final KV<String,Iterable<KV<String,Integer>>> in, OutputReceiver<KV<String,ArrayList<ArrayList<KV<String,Integer>>>>>  out) {
          

            ArrayList<ArrayList<KV<String,Integer>>> sorted = new ArrayList<ArrayList<KV<String,Integer>>>();
            for(int i =0; i<3;i++){
                sorted.add(new ArrayList<KV<String,Integer>>());
            }
           
            for(KV<String,Integer>kv:in.getValue()){
                int pos = 0;
                String str = kv.getKey();
                while(str.charAt(0)=='-'){
                    pos++;
                    if(str.length()<=1){
                        continue;
                    }

                    str=str.substring(1);
                }
               
                sorted.get(pos).add(KV.of(str,kv.getValue()));
             }
             out.output(KV.of(in.getKey(),sorted));

         
        }
      }


    static class NextGivenString extends DoFn<KV<String,ArrayList<ArrayList<KV<String,Integer>>>>,KV<String,Integer>> {
        @ProcessElement
        public void processElement(@Element final KV<String,ArrayList<ArrayList<KV<String,Integer>>>> in, OutputReceiver<KV<String,Integer>>  out) {
            String[]currWords=sentence.split(ExampleUtils.TOKENIZER_PATTERN);
            if(in.getKey().equals(currWords[currWords.length-1])){
                for(KV<String,Integer> kv: in.getValue().get(0)){
                    out.output(KV.of(kv.getKey(),kv.getValue()*4));//directly preceding works count for x4
                }
                return;
            }
            if(currWords.length-2>=0&&in.getKey().equals(currWords[currWords.length-2])){
                for(KV<String,Integer> kv: in.getValue().get(1)){
                    out.output(KV.of(kv.getKey(),kv.getValue()*2));//one intermediate word count for *2
                }
                return;
            }

            if(currWords.length-3>=0&&in.getKey().equals(currWords[currWords.length-3])){
                for(KV<String,Integer> kv: in.getValue().get(2)){
                    out.output(kv);
                }
                return;
            }



         
        }
    }

    static class OutputIntoJava extends DoFn<KV<String,Integer>,String> {
        @ProcessElement
        public void processElement(@Element final KV<String,Integer> in, OutputReceiver<String>  out) {
            //System.out.println("UH OH "+ in.getKey()+ " With freq: "+in.getValue());
            output= in.getKey();
            out.output(in.getKey());

         
        }
    }

    public static class KVComparator implements Comparator<KV<String,Integer>>, Serializable {
        @Override
        public int compare(KV<String, Integer> o1, KV<String, Integer> o2) {
         return   o1.getValue().compareTo(o2.getValue());
        }
    }
    
      



    public static void main(final String[] args) {

        final WordCountOptions options = PipelineOptionsFactory.fromArgs(args).withValidation().as(WordCountOptions.class);
        Scanner scan = new Scanner(System.in);



        final Pipeline p = Pipeline.create(options);
       
     
            
        while(true){
            System.out.println();
            System.out.println();
            System.out.println("Enter a word or partial sentence (/quit to quit): ");
            String line= scan.nextLine().toLowerCase();
            if(line.equals("/quit")){
                break;
            }

            sentence+=" "+line;

            p.apply("ReadLines", TextIO.read().from(options.getInputFile()))
            .apply(ParDo.of(new NextWords()))
            .apply(ParDo.of(new BaseFreqOne()))
            .apply(Sum.integersPerKey())
            .apply(ParDo.of(new SortByWord()))
            .apply(GroupByKey.create())
            .apply(ParDo.of(new SeperatePosition()))
            .apply(ParDo.of(new NextGivenString()))
            .apply(Sum.integersPerKey())
            .apply(Max.globally(new KVComparator()))
            .apply(ParDo.of(new OutputIntoJava()));


            p.run().waitUntilFinish();
           

            System.out.println("\n\nCurrent Sentence: "+sentence);
            System.out.println("Predicted Next Word: "+output);

        }
    
        scan.close();
            
      }

}