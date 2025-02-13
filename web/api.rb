module WhitelabelingCollector
  module Web
    class SubmissionApiController
      # create a new submission
      # get details of submission with ACL
      # update data for a submission
      # list my submissions
      # file upload
      # validate submission
    end

    class DataBucketApiController
      # list data buckets
      # get data bucket details
      # list submissions for data bucket
      # list fields of databucket
      # add field to databucket
      # soft remove field from databucket
      # add validator to field
      # remove validator from field
      # list validators
      # list all available validator types
      # create invitation link for customer to upload
    end

    class OrganizationController
      # list invitations
      # invite somebody
      # get branding
      # accept invitation
    end

    class ProfileController
    end

    class LoginController
      # get a new access token
      # validate token static
    end
  end
end
