using System.Collections.Generic;

namespace SE.Core.Common;

public interface IResponse<T>
{
    T Data { get; }
    string ErrorMessage { get; }
    bool Succeeded { get; }
}
    
public static class Response
{
    public static IResponse<T> Fail<T>(string error)
        => new Response<T>(error, false);
        
    public static IResponse<T> Success<T>(T data)
        => new Response<T>(data,true);
}

public class Response<T> : IResponse<T>
{
    public Response(string error, bool succeeded)
    {
        ErrorMessage = error;
        Succeeded = succeeded;
    }
        
    public Response(T data,bool succeeded)
    {
        Data = data;
        ErrorMessage = "";
        Succeeded = succeeded;
    }

    public T Data { get; } = default!;
    public string ErrorMessage { get; }
    public bool Succeeded { get; }
}