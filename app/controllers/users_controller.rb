class UsersController < ApplicationController
  before_action :search_users, only: [:index, :edit]

  def index
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def search_users
    @users = User.where('name LIKE(?)', "%#{search_user_params[:search_name]}%")
    respond_to do |format|
      format.html
      format.json
    end
  end

  def user_params
    params.require(:user).permit(:name, :email)
  end

  def search_user_params
    params.permit(:search_name)
  end
end
