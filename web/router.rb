require_relative '../lib/whitelabeling_collector.rb';
require 'active_record'
require 'json'
require 'sinatra'

WhitelabelingCollector::Lib.init(adapter: 'sqlite3', database: 'Test.sqlite3')
before '/*' do
  content_type :json
end

post '/organizations' do
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

post '/organizations/:organization_id/data_buckets' do
  validate_user_is_organization_admin

  WhitelabelingCollector::Lib::DataBucket.create(organization_id: params[:organization_id], name: json_body['name']).to_json
end

get '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions' do
  validate_user_is_organization_admin
end

post '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions' do
  validate_user_is_organization_admin
  WhitelabelingCollector::Lib::Submission.create(organization_id: params[:organization_id], data_bucket_id: params[:data_bucket_id])
end

get '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions/:submission_id' do
end

put '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions/:submission_id' do
end

post '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions/:submission_id/validate' do
  validate_user_is_organization_admin
end
