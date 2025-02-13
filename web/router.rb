require_relative '../lib/whitelabeling_collector.rb';
require 'active_record'
require 'json'
require 'sinatra'

WhitelabelingCollector::Lib.init(adapter: 'sqlite3', database: 'Test.sqlite3')
before '/*' do
  content_type :json
end

def validate_user_is_organization_admin
  if params[:organization_id] == "69"
    halt 401
  end
  # todo
end

get '/organizations/:organization_id/data_buckets' do
  validate_user_is_organization_admin

  WhitelabelingCollector::Lib::DataBucket.where(organization_id: params[:organization_id]).to_json
end

get '/organizations/:organization_id/data_buckets/:data_bucket_id' do
  validate_user_is_organization_admin

  WhitelabelingCollector::Lib::DataBucket.find(params[:data_bucket_id]).to_json
end

def json_body
  JSON.parse request.body.read
end

# Create a new organization. Should be limited to X
post '/organizations'
end

post '/upload'
# maybe wrong to have a generic upload route.
end

post '/organizations/:organization_id/invite' do
end

post '/organizations/:organization_id/data_buckets' do
  validate_user_is_organization_admin

  WhitelabelingCollector::Lib::DataBucket.create(organization_id: params[:organization_id], name: json_body['name']).to_json
end

put '/organizations/:organization_id/data_buckets' do
  # Changes the field definitions
  validate_user_is_organization_admin

  WhitelabelingCollector::Lib::DataBucket.create(organization_id: params[:organization_id], name: json_body['name']).to_json
end

get '/organizations/:organization_id/data_buckets/fields' do
end

post '/organizations/:organization_id/data_buckets/fields' do
end

put '/organizations/:organization_id/data_buckets/fields/:field_id' do
end

get '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions' do
  validate_user_is_organization_admin
end

post '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions' do
  validate_user_is_organization_admin
  WhitelabelingCollector::Lib::Submission.create(organization_id: params[:organization_id], data_bucket_id: params[:data_bucket_id])
end

get '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions/:submission_id' do
  # todo: check if user is
  #   either organization id
  #   or submitter

  WhitelabelingCollector::Lib.Submission.find(params[:submission_id])
end

put '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions/:submission_id' do
  # todo: check if user is
  #   either organization id
  #   or submitter

end

post '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions/:submission_id/validate' do
  # todo: check if user is
  #   either organization id
  #   or submitter

  validate_user_is_organization_admin
end
