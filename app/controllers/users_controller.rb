class UsersController < ApplicationController

  def index
    @users = User.where("name like ?", "%#{search_user_params[:search_name]}%")
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
    users = User.where("name like ?", "%#{search_user_params[:search_name]}%")
    respond_to do |format|
      format.html
      format.json
    end
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

  def search_user_params
    params.permit(:search_name)
  end
end
