module WhitelabelingCollector::Lib
  class Validator < ActiveRecord::Base
    def validate(data)
      raise "Not implemented."
    end
  end

  class ImageSizeValidator < Validator
    attr_accessor :image_width, :image_height
    def validate(image)
      # check image dimensions
    end
  end

  class JsonSchemeValidator < Validator
    def validate(json)
    end
  end

  class RegexValidator < Validator
    attr_accessor :regex
    def validate(content)
    end
  end
end
