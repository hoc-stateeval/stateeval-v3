using System;

namespace SE.Domain.Exceptions;

public class SignInException : Exception
{
    private SignInException() : base("The user or password is incorrect.")
    {
    }

    public static SignInException Instance { get; } = new();
}