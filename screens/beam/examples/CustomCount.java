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
import org.apache.beam.sdk.transforms.PTransform;
import org.apache.beam.sdk.transforms.GroupByKey;
import org.apache.beam.sdk.transforms.ParDo;
import org.apache.beam.sdk.transforms.Sum;
import org.apache.beam.sdk.transforms.SimpleFunction;
import org.apache.beam.sdk.values.KV;
import org.apache.beam.sdk.values.PCollection;
import org.apache.beam.sdk.transforms.Combine;
import org.apache.beam.sdk.transforms.MapElements;
import java.util.*;




public class CustomCount {


    public interface WordCountOptions extends PipelineOptions {

    
        @Description("Path of the file to read from")
        @Default.String("gs://apache-beam-samples/shakespeare/kinglear.txt")
        String getInputFile();
    
        void setInputFile(String value);
    
        @Description("Path of the file to write to")
        @Required
        String getOutput();
    
        void setOutput(String value);
      }



      static class WordCount extends DoFn<String, KV<String,Integer>> {
        @ProcessElement
        public void processElement(@Element final String line, final OutputReceiver<KV<String,Integer>> out) {
          // Use OutputReceiver.output to emit the output element.
         // final List<KV<String, Integer>> word_count = new ArrayList<KV<String, Integer>>();
        // System.out.println("CUSTOM PROCESSING FOR LINE: "+line);

          final HashMap<String, Integer> counter = new HashMap<String, Integer>();
          for(final String s: line.split(ExampleUtils.TOKENIZER_PATTERN)){
            if(counter.keySet().contains(s)){
                counter.put(s, counter.get(s)+1);
            }
            else{
                counter.put(s, 1);
            }
          }
         

          for(final String s: counter.keySet()){
              out.output(KV.of(s, counter.get(s)));
          }

        }
      }

      public static class FormatOutput extends DoFn<KV<String,Integer>,String> {
        @ProcessElement
        public void apply(@Element final KV<String,Integer> input, OutputReceiver<String> out) {
        //System.out.println(input.getKey() + ": " + input.getValue());
          out.output( input.getKey() + ": " + input.getValue());
        }
      }


    public static void main(final String[] args) {

        //System.out.println("CUSTOM CODE STARTING");
        final WordCountOptions options = PipelineOptionsFactory.fromArgs(args).withValidation().as(WordCountOptions.class);

            final Pipeline p = Pipeline.create(options);

            
            

            p.apply("ReadLines", TextIO.read().from(options.getInputFile()))
            .apply(ParDo.of(new WordCount()))
            .apply(Sum.integersPerKey())
            .apply(ParDo.of(new FormatOutput()))
            .apply("WriteCounts", TextIO.write().withNumShards(2).to(options.getOutput()));

            p.run().waitUntilFinish();
            
      }

}